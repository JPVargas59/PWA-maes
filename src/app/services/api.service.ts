import { Injectable } from '@angular/core';
import {HTTP} from '@ionic-native/http/ngx';
import {Horario, Mae, Materia} from './models/models';
import {Platform} from '@ionic/angular';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {of} from 'rxjs';
import {forEach} from '@angular-devkit/schematics';
import {UtilsService} from '../utils.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

    // baseURL = 'https://dma.mty.itesm.mx/beta/registro/concentrado/php/concentradoService.php';
    // baseURL = 'http://192.168.0.2:5000/beta/registro/concentrado/php/concentradoService.php';
    baseUrl = 'https://dma.mty.itesm.mx/DMA/API/';
    modalidad = 'tradicional';

    constructor(
      private http: HTTP,
      private platform: Platform,
      private httpDesktop: HttpClient,
      private utils: UtilsService
  ) { }

  private get(object, url = this.baseUrl) {
    console.log(this.platform.platforms());
    if (!this.platform.is('cordova')) {
        return new Promise<any>(resolve => {
            this.httpDesktop.get(url, {params: object}).pipe().
            subscribe(response => {
                resolve({data: response});
            });
        });
    } else {
        return this.http.get(url, object, {
            ContentType : 'application/json',
            dataType : 'json',
        }).then(result => {
            result.data = JSON.parse(result.data);
            return result;
        });
    }
  }

  private post(object, url = this.baseUrl) {
      console.log(this.platform.platforms());
      if (!this.platform.is('cordova')) {
          return new Promise<any>(resolve => {
              const form = new FormData();
              // tslint:disable-next-line:forin
              for (const key in object) {
                  form.append(key, object[key]);
              }
              this.httpDesktop.post(url, form).pipe().
              subscribe(response => {
                  resolve({data: response});
              });
          });
      } else {
          return this.http.post(url, object, {
              ContentType : 'application/json',
              dataType : 'text',
          }).then(result => {
              result.data = JSON.parse(result.data);
              return result;
          });
      }

  }

  getMaterias(modalidad): Promise<Materia[]> {
    const json = { modalidad };
    const url = 'https://dma.mty.itesm.mx/DMA/API/Materia/SearchMateria.php';
    return this.get({}, url)
        .then(result => {
            result.data.materias.sort((a, b) => {
                const nameA = a.nombre.toUpperCase(); // ignore upper and lowercase
                const nameB = b.nombre.toUpperCase(); // ignore upper and lowercase

                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }

                // names must be equal
                return 0;
            });
            return result.data.materias;
        })
        .catch(e => {
          return e;
        });
  }

  getHorariosMateria(dia, materia, modalidad): Promise<Horario[]> {
    if (!modalidad) {
        modalidad = this.utils.getModadalidad();
    }
    // const json = { dia: dia.toString(), materia, modalidad };
    const url = this.baseUrl + 'HorarioMae/ReadHorarioMaePorDiaMateria.php';
    const json = { dia, materia };
    return this.post(json, url)
        .then(result => {
            const maes = {};
            result.data.horarios.map((h, i) => {
                if (!!maes[h.matricula]) {
                    result.data.horarios[i] += maes[h.matricula];
                }
            });
            return result.data.horarios;
        })
        .catch(e => {
            console.log(e);
            return e;
        });
  }

  getTemasMateria(materia): Promise<any[]> {
    const json = { materia, action: 'GET-TEMAS-MATERIA'};
    return this.post(json)
        .then(result => {
          return result.data;
        })
        .catch(e => {
          return e;
        });
  }

  getSubtemas(materia, tema, dia): Promise<any[]> {
    const json = { materia, tema, dia, action: 'GET-SUBTEMAS-21' };
    return this.post(json)
        .then(result => {
          return result.data;
        })
        .catch(result => {
          return result.data;
        });
  }

  getMateriasMae(mae): Promise<Materia[]> {
    const url = this.baseUrl + 'MaeMateria/ReadAllMateriasPorMae.php';
    const json = { matricula: mae };
    return this.get(json, url)
        .then(result => {
            console.log(result.data);
            return result.data.materias;
        })
        .catch(e => {
          return e;
        });
  }

  getHorariosMae(mae): Promise<any[]> {
    const url = this.baseUrl + 'HorarioMae/ReadAllHorarioMae.php';
    const json = { matricula: mae };
    return this.get(json, url)
        .then(result => {
            return result.data.horarios;
        })
        .catch(e => {
          return e;
        });
  }

  verificarAlumno(matricula): Promise<any> {
    const url = this.baseUrl + 'Alumno/existeAlumno.php';
    matricula = matricula.toUpperCase();
    const json = { matricula };
    return this.get(json, url)
        .then(result => {
          return result.data.alumno;
        })
        .catch(e => {
          return e;
        });
  }

  getMaesActivos(): Promise<Mae[]> {
      const json = { };
      const url = 'https://dma.mty.itesm.mx/DMA/API/Activo/ReadAllActivos.php';

      return this.get(json, url)
          .then(result => {
              return result.data.activos;
          })
          .catch(e => {
              return e;
          });
  }

    getCarreras(): Promise<any[]> {
        const json = { action: 'GET-CARRERAS'};
        // sconst url = 'http://192.168.0.2:5000/beta/registro/alumno/php/applicationLayer.php';
        const url = 'https://dma.mty.itesm.mx/beta/registro/alumno/php/applicationLayer.php';
        return this.post(json, url)
            .then(result => {
                console.log(result.data);
                return result.data;
            })
            .catch(e => {
                return e;
            });
    }

    updateInfoAlumno(matricula, cambio, infoCambiar ): Promise<any[]> {
        matricula = this.utils.removeAFromId(matricula);
        const json = { action: `UPDATE-${cambio}`, matricula, infoCambiar};
        return this.post(json)
            .then(result => {
                return result.data;
            })
            .catch(e => {
                return e;
            });
    }

    getInfoAlumno(matricula) {
        matricula = this.utils.removeAFromId(matricula);
        const json = { action: `GET-INFO-ALUMNO`, matricula};
        return this.post(json)
            .then(result => {
                return result.data;
            })
            .catch(e => {
                return e;
            });
    }

    registrarAlumno({matricula, nombre, apellido, correo, carrera, telefono}) {
        // const url = 'http://192.168.0.2:5000/beta/registro/alumno/php/applicationLayer.php';
        const url = 'https://dma.mty.itesm.mx/beta/registro/alumno/php/applicationLayer.php';
        const json = {
            action: `CREAR-ALUMNO`,
            matricula: matricula.toUpperCase(),
            nombre,
            apellido,
            correo,
            carrera,
            telefono,
            tipo: 1
        };
        console.log(json);
        return this.post(json, url)
            .then(result => {
                return result.data;
            })
            .catch(e => {
                return e;
            });
    }

    isMae(matricula) {
        matricula = this.utils.removeAFromId(matricula);
        const json = { action: `GET-INFO-ALUMNO`, matricula};
        return this.post(json)
            .then(result => {
                return result.data;
            })
            .catch(e => {
                return e;
            });
    }

    getNumeroAsesorias(year = 2019, mes = 8) {
        const url = this.baseUrl + 'Asesoria/ReadNumAsesoriasSemestre.php';
        return this.get({}, url)
            .then(result => {
                return result.data.numAsesoriasSemestre;
            })
            .catch(e => {
                return e;
            });
    }

    getNumeroAsesorados(year = 2019, mes = 8) {
        const url = this.baseUrl + 'Asesoria/ReadNumAsesoradosSemestre.php';
        return this.get({}, url)
            .then(result => {
                return result.data.numAsesoriasSemestre;
            })
            .catch(e => {
                return e;
            });
    }

    getEventos() {
        const url = this.baseUrl + 'Evento/ReadAllEventosMes.php';
        const json = {};
        return this.get(json, url)
            .then(result => {
                return result.data.eventos;
            })
            .catch(e => {
                return e;
            });
    }

    getPerfilMae(matricula) {
        const json = {matricula};
        const url = this.baseUrl + 'Mae/ReadOneMae.php';
        return this.get(json, url)
            .then(result => {
                return result.data;
            })
            .catch(e => {
                return e;
            });
    }
}
