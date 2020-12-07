import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../services/api.service';

@Component({
  selector: 'app-enterate',
  templateUrl: './enterate.component.html',
  styleUrls: ['./enterate.component.scss'],
})
export class EnterateComponent implements OnInit {

  asesorias;
  asesorados;
  constructor(
      private api: ApiService
  ) { }

  ngOnInit() {
    this.api.getNumeroAsesorados()
        .then(r => {
            this.asesorados = r;
        });
    this.api.getNumeroAsesorias()
        .then(r => {
          this.asesorias = r;
        });
  }

}
