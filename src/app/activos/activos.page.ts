import { Component, OnInit } from '@angular/core';
import {ApiService} from '../services/api.service';
import {Mae} from '../services/models/models';
import {UtilsService} from '../utils.service';

@Component({
  selector: 'app-activos',
  templateUrl: './activos.page.html',
  styleUrls: ['./activos.page.scss'],
})
export class ActivosPage implements OnInit {

  maes: Mae[];
  carreras = new Set();

  constructor(
      private api: ApiService,
      public utils: UtilsService
  ) { }

  ngOnInit() {
    this.refresh(null);
  }

  refresh(event) {
      this.api.getMaesActivos()
          .then(maes => {
              this.maes = maes;
              maes.map(mae => {
                  console.log(mae);
                  this.carreras.add(mae.carrera);
              });
          })
          .then(() => {
              if (event) {
                  event.target.complete();
              }
          });
  }

}
