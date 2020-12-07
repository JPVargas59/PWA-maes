import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ApiService} from '../../services/api.service';
import {Horarios} from '../../services/models/models';
import {UtilsService} from '../../utils.service';
import {Observable, of} from 'rxjs';

@Component({
  selector: 'app-materia',
  templateUrl: './materia.component.html',
  styleUrls: ['./materia.component.scss'],
})
export class MateriaComponent implements OnInit {

  materia: string;
  idMateria;
  horarios = [];
  semana = [
    'Lunes',
    'Martes',
    'Miercoles',
    'Jueves',
    'Viernes'
  ];
  selected;
  changeDay = false;
  isFav: Observable<string>;
  modalidad;
  maes = {};

  constructor(
      private route: ActivatedRoute,
      private api: ApiService,
      private utils: UtilsService
  ) { }

  ngOnInit() {
    this.modalidad = this.utils.getModadalidad();
    this.selected = this.utils.getDate();
    this.materia = this.route.snapshot.params.nombreMateria;
    this.idMateria = this.route.snapshot.params.idMateria;
    this.semana.map((dia, index) => {
      this.horarios[index] = new Map();
      this.api.getHorariosMateria(index + 1, this.idMateria, this.modalidad)
          .then(maes => {
            maes.map(m => {
              // @ts-ignore
              this.api.getPerfilMae(m.matricula)
                  .then(r => {
                    this.maes[r.matricula] = r;
                  });
            });
            /*this.api.getPerfilMae(maes)
                .then(r => {
                  result.data.horarios[i] = {...h, ...r};
                });*/
            this.horarios[index] = this.parseHorarios(maes);
            console.log('HORARIOS', this.horarios[index]);
          })
          .then(() => {
            // console.log(this.horarios);
          });
    });
    this.fav();
  }

  parseHorarios(maes) {
    const remapMaes = new Map();
    let tempArr = [];
    console.log('maes', maes);
    maes.map(mae => {
      console.log('MAE', mae);
      mae.inicio = mae.inicio.split(':')[0] + ':' + mae.inicio.split(':')[1];
      mae.fin = mae.fin.split(':')[0] + ':' + mae.fin.split(':')[1];

      tempArr = [];
      if (remapMaes.has(mae.inicio)) {
        tempArr = remapMaes.get(mae.inicio);
      }
      tempArr.push(mae);
      remapMaes.set(mae.inicio, tempArr);
    });
    return remapMaes;
  }

  fav(changing = false) {
    if (changing) {
      this.utils.switchFav(this.materia, this.idMateria);
    }
    this.isFav = this.utils.isFav(this.materia) ? of('primary') : of('dark');
  }
}
