import { Component, OnInit } from '@angular/core';
import {UtilsService} from '../../utils.service';
import {Router} from '@angular/router';
import {EventsServiceService} from '../../services/events-service.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit {

  user = {
    nombre: undefined,
    matricula: undefined,
    apellido: undefined,
    correo: undefined,
    telefono: undefined,
    carrera: undefined
  };

  constructor(
      private utils: UtilsService,
      private router: Router,
      private events: EventsServiceService
  ) { }

  ngOnInit() {
    this.user = this.utils.getAlumno();
  }

  removeUser() {
    this.utils.removeAlumno();
    this.events.trigger();
    this.router.navigate(['/registro']);
  }

}
