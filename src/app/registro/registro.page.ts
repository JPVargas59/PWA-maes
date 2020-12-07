import { Component, OnInit } from '@angular/core';
import {ApiService} from '../services/api.service';
import {UtilsService} from '../utils.service';
import {Router} from '@angular/router';
import {EventsServiceService} from '../services/events-service.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  step = 1;
  user = {
    nombre: undefined,
    matricula: undefined,
    apellido: undefined,
    correo: undefined,
    telefono: undefined,
    carrera: undefined
  };
  validation = {
      nombre: true,
      matricula: true,
      apellido: true,
      correo: true,
      telefono: true,
      carrera: true
  };
  userValid = 'primary';
  regex = new RegExp('[A-a]?[0-9]{8}');
  carreras = [];

  // Regex pattern matricula [A-a]?[0-9]{8}

  constructor(
      private api: ApiService,
      private utils: UtilsService,
      private router: Router,
      private events: EventsServiceService
  ) { }

  ngOnInit() {
      this.events.trigger();
      this.api.getCarreras()
          .then(c => {
              // @ts-ignore
              this.carreras = c.carreras;
          });
  }

  checkUser() {
    const isValid = this.regex.test(this.user.matricula);
    this.userValid = isValid ? 'primary' : 'danger';
    if (isValid) {
      this.api.verificarAlumno(this.user.matricula)
          .then(result => {
            console.log(result);
            if (result === '1') {
              this.api.getInfoAlumno(this.user.matricula)
                  .then(alumno => {
                    console.log(alumno);
                    this.user = alumno;
                    this.utils.storeAlumno(alumno);
                    this.step = 3;
                  });
            } else {
              console.log('usuario no existe');
              this.user.correo = `${this.user.matricula.toUpperCase()}@itesm.mx`;
              this.step = 2;
            }
          });
    }
  }

  register() {
      let valid = true;
      // tslint:disable-next-line:forin
      for (const key in this.user) {
          this.validation[`${key}`] = !!this.user[`${key}`];
          if (!(!!this.user[`${key}`])) {
              valid = false;
          }
      }
      if (valid) {
          this.api.registrarAlumno(this.user)
              .then((r) => {
                  if (r.exito) {
                      this.step = 3;
                      this.utils.storeAlumno(this.user);
                  }
              });
      }

  }

  goToHome() {
      this.events.trigger();
      this.step = 1;
      this.user = {
          nombre: undefined,
          matricula: undefined,
          apellido: undefined,
          correo: undefined,
          telefono: undefined,
          carrera: undefined
      };
      this.router.navigate(['/home']);
  }

}
