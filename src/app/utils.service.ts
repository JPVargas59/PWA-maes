import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {Materia} from './services/models/models';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import {EventsServiceService} from './services/events-service.service';


@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  public semana = [
    'Lunes',
    'Martes',
    'Miercoles',
    'Jueves',
    'Viernes'
  ];

  constructor(
      private router: Router,
      private nativeStorage: NativeStorage,
      private events: EventsServiceService
  ) { }

  setObj = function(key, obj) {
    return this.setItem(key, JSON.stringify(obj));
  };

  getObj = function(key) {
    return JSON.parse(this.getItem(key));
  };

  goto(route) {
    return this.router.navigate([route]);
  }

  switchFav(materia, id) {
    console.log(this.isFav(materia));
    if (this.isFav(materia)) {
      this.removeFav(materia);
    } else {
      this.addFav(materia, id);
    }
    this.events.newFavEvent();
  }

  addFav(materia, id) {
    let numFavs = this.getNumFavs();
    const modalidad = this.getModadalidad();
    const json = {nombre: materia, id, pos: numFavs, modalidad};
    window.localStorage.setItem(`favs_${numFavs}`, JSON.stringify(json));
    numFavs++;
    this.setNumFavs(numFavs);
  }

  getNumFavs() {
    const stringNumFavs = window.localStorage.getItem('numFavs');
    let numFavs = parseInt(stringNumFavs, 10);
    if (!stringNumFavs) {
      numFavs = 0;
    }
    return numFavs;
  }

  setNumFavs(num) {
    window.localStorage.setItem('numFavs', num);
  }

  removeFav(materia) {
    const favsArray = this.getFavourites();
    const newFavs = favsArray.filter(f => f.nombre !== materia);
    const numFavs = this.getNumFavs();
    let newNumFavs = 0;
    for (let i = 0 ; i < numFavs ; i++) {
      if (newFavs[i]) {
        newNumFavs++;
        window.localStorage.setItem(`favs_${i}`, JSON.stringify(newFavs[i]));
      } else {
        window.localStorage.removeItem(`favs_${i}`);
      }
    }
    this.setNumFavs(newNumFavs);
    this.events.newFavEvent();
  }

  getFavourites(): Materia[] {
    const numFavs = this.getNumFavs();
    const favsArray = [];
    for (let i = 0 ; i < numFavs ; i++) {
      const fav = window.localStorage.getItem(`favs_${i}`);
      favsArray.push(JSON.parse(fav));
    }
    console.log(favsArray);
    return favsArray;
  }

  isFav(materia) {
    let favsArray = this.getFavourites();
    favsArray = favsArray.filter(f => f.nombre === materia);
    return favsArray.length > 0;
  }

  getDate() {
    let date = new Date().getDay();
    if (date === 6 || date === 7) {
      date = 1;
    }
    return date;
  }

  removeAFromId(matricula) {
    if (matricula.toLowerCase().includes('a')) {
      matricula = matricula.slice(1);
    }
    return matricula;
  }

  storeAlumno(alumno) {
    window.localStorage.setItem('info-alumno', JSON.stringify(alumno));
  }

  getAlumno() {
    return JSON.parse(window.localStorage.getItem('info-alumno'));
  }

  removeAlumno() {
    window.localStorage.removeItem('info-alumno');
  }

  getModadalidad() {
    const modalidad = window.localStorage.getItem('modalidad');
    if (!modalidad) {
      window.localStorage.setItem('modalidad', 'tradicional');
    }
    return window.localStorage.getItem('modalidad');
  }

  switchModalidad() {
    let modalidad = this.getModadalidad();
    if (modalidad === 'TEC21') {
      modalidad = 'tradicional';
    } else {
      modalidad = 'TEC21';
    }
    window.localStorage.setItem('modalidad', modalidad);
  }

}
