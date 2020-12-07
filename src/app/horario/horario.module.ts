import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { HorarioPage } from './horario.page';
import {ComponentsModule} from '../components/components.module';
import {ListaMateriasComponent} from './lista-materias/lista-materias.component';
import {MateriaComponent} from './materia/materia.component';

const routes: Routes = [
    {
    path: '',
    component: HorarioPage
    },
    {
        path: ':idMateria/:nombreMateria',
        component: MateriaComponent
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        ComponentsModule
    ],
    exports: [
        MateriaComponent
    ],
    declarations: [HorarioPage, ListaMateriasComponent, MateriaComponent]
})
export class HorarioPageModule {}
