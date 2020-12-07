import {Component, Input, OnInit} from '@angular/core';
import {Materia} from '../../services/models/models';

@Component({
  selector: 'app-materia-element',
  templateUrl: './materia-element.component.html',
  styleUrls: ['./materia-element.component.scss'],
})
export class MateriaElementComponent implements OnInit {

  @Input() header;
  @Input() materia: Materia;

  constructor() { }

  ngOnInit() {}

  favorite(materia: Materia) {
    let favs = window.localStorage.getItem('favs');
    if (!favs) {
      favs = '';
    }
    favs += `${materia.id} - ${materia.nombre},`;

    window.localStorage.setItem('favs', favs);
  }

  show() {
    if (this.header) {
      return this.materia.nombre[0]
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '') === this.header;
    }
    return true;
  }
}
