import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MaeProfilePage } from './mae-profile.page';
import {ComponentsModule} from '../components/components.module';

const routes: Routes = [
  {
    path: '',
    component: MaeProfilePage
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
  declarations: [MaeProfilePage]
})
export class MaeProfilePageModule {}
