import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {ActivatedRoute, Route, Router} from '@angular/router';
import {of} from 'rxjs';
import {EventsServiceService} from './services/events-service.service';


// export JAVA_HOME=$(/usr/libexec/java_home -v 1.8)

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  registro = of(true);

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private events: EventsServiceService
  ) {
    this.initializeApp();
    this.registro = of(window.localStorage.getItem('info-alumno') !== null);
    events.userRegistered.subscribe((r) => this.onItemAdded(r));
  }

  private onItemAdded(r): void {
    this.registro = r;
    // do something with added item
    // this.registro = of(window.location.href.includes('registro'));
    // console.log(window.location.href.includes('registro'));
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // this.statusBar.backgroundColorByName("white");
      // this.statusBar.styleLightContent();
      this.statusBar.hide();
      this.splashScreen.hide();
    });
  }
}
