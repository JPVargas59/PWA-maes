import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ApiService} from '../services/api.service';
import {UtilsService} from '../utils.service';
import {Materia} from '../services/models/models';
import {of} from 'rxjs';
import {EventsServiceService} from '../services/events-service.service';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.page.html',
  styleUrls: ['./favoritos.page.scss'],
})
export class FavoritosPage implements OnInit {

  semana = [
    'Lunes',
    'Martes',
    'Miercoles',
    'Jueves',
    'Viernes'
  ];
  selected;
  changeDay = false;
  favorites: Materia[];
  horarios = of([]);
  maes = {};
  constructor(
      private route: ActivatedRoute,
      private api: ApiService,
      public utils: UtilsService,
      private events: EventsServiceService
  ) { }

  ngOnInit() {
    this.selected = this.utils.getDate();
    this.loadFavs();
    this.events.newFav.subscribe(() => this.loadFavs());
  }

  change(day) {
    this.selected = day;
    this.favorites.map((materia, index) => {
      this.horarios[index] = of([]);
      this.api.getHorariosMateria(this.selected, materia.id, materia.modalidad)
          .then(h => {
            h.map(m => {
              // @ts-ignore
              this.api.getPerfilMae(m.matricula)
                  .then(r => {
                    this.maes[r.matricula] = r;
                  });
            });
            if (h.length > 0) {
              this.horarios[index] = of(h);
            } else {
              this.horarios[index] = of([false]);
            }
            console.log(this.horarios);
          });
    });
  }

  loadFavs() {
    this.favorites = this.utils.getFavourites();
    this.change(this.selected);

  }

}
