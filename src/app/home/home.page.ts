import { Component } from '@angular/core';
import {ApiService} from '../services/api.service';
import {ModalController} from '@ionic/angular';
import {PerfilComponent} from '../components/perfil/perfil.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
      private modalCtrl: ModalController
  ) { }

  async showProfile() {
    const modal = await this.modalCtrl.create({
      component: PerfilComponent
    });
    return await modal.present();
  }
}
