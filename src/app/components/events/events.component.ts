import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../services/api.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
})
export class EventsComponent implements OnInit {

  eventos = [];

  constructor(
      private api: ApiService
  ) { }

  ngOnInit() {
    this.api.getEventos()
        .then(e => {
          console.log(e);
          this.eventos = e;
        });
  }

}
