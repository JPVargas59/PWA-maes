import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import {ComponentsModule} from '../components/components.module';
import {ApiService} from '../services/api.service';
import {PerfilComponent} from '../components/perfil/perfil.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      },
      {
        path: 'perfil',
        component: PerfilComponent
      }
    ])
  ],
  entryComponents: [PerfilComponent],
  declarations: [HomePage]
})
export class HomePageModule {
  
}
