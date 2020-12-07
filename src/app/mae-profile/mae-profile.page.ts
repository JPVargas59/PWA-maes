import { Component, OnInit } from '@angular/core';
import {Mae} from '../services/models/models';
import {ApiService} from '../services/api.service';
import {ActivatedRoute} from '@angular/router';
import {UtilsService} from '../utils.service';

@Component({
  selector: 'app-mae-profile',
  templateUrl: './mae-profile.page.html',
  styleUrls: ['./mae-profile.page.scss'],
})
export class MaeProfilePage implements OnInit {

  mae: Mae = {
    nombre: '',
    apellido: '',
    id: '',
    carrera: ''
  };
  conoceMae = '';
  materias = [];
  horarios = [];

  constructor(
      private api: ApiService,
      private route: ActivatedRoute,
      public utils: UtilsService
  ) {
    this.mae.id = this.route.snapshot.params.idMae;
    this.mae.nombre = this.route.snapshot.params.nombreMae;
  }

  ngOnInit() {
    this.api.getHorariosMae(this.mae.id)
        .then(r => {
          this.horarios = r;
        });
    this.api.getMateriasMae(this.mae.id)
        .then(r => {
          this.materias = r;
        });
  }

}
