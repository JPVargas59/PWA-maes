import {Component, Input, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {Materia} from '../../services/models/models';
import {UtilsService} from '../../utils.service';

@Component({
  selector: 'app-lista-materias',
  templateUrl: './lista-materias.component.html',
  styleUrls: ['./lista-materias.component.scss'],
})
export class ListaMateriasComponent implements OnInit {


    materias: Materia[];
    materiasUnFiltered: Materia[];
    searched = false;
    searching = false;
    firstChars = new Set();
    modalidad;

    constructor(private api: ApiService, private utils: UtilsService) { }

    ngOnInit() {
        this.modalidad = this.utils.getModadalidad();
        this.api.getMaterias(this.modalidad)
            .then(materias => {
                materias.map(m => {
                    this.firstChars.add(
                        m.nombre[0].normalize('NFD')
                            .replace(/[\u0300-\u036f]/g, ''));
                });
                this.materias = materias;
                this.materiasUnFiltered = materias;
            });
    }

    goto(materia) {
        this.utils.goto(`horario/${materia.clave}/${materia.nombre}`);
    }

    resetFirstChars(materias: Materia[]) {
        this.firstChars = new Set();
        materias.map(m => {
            this.firstChars.add(m.nombre[0].normalize('NFD').replace(/[\u0300-\u036f]/g, ''));
        });
    }

    filter(event) {
        const search = event.detail.value.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        this.materias = this.materiasUnFiltered;

        if (search === '' || search === undefined) {
            this.searched = false;
        } else {
            this.searched = true;
            this.materias = this.materias.filter(
                m => m.nombre.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(search.toLowerCase()));
            console.log(this.materias);

        }
    }

    cambiarModalidad(event) {
        const modalidad = this.modalidad;
        this.utils.switchModalidad();
        this.api.getMaterias(modalidad)
            .then(materias => {
                this.resetFirstChars(materias);
                this.materias = materias;
                this.materiasUnFiltered = materias;
            });

    }


}
