import { Injectable } from '@angular/core';
import {CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {EventsServiceService} from '../services/events-service.service';

@Injectable({
  providedIn: 'root'
})
export class IsRegisteredGuard implements CanLoad {

  constructor(
      private router: Router,
      private events: EventsServiceService
  ) {

  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    if (window.localStorage.getItem('info-alumno') !== null) {
      return true;
    } else {
      this.router.navigateByUrl('/registro');
      this.events.trigger();
      return false;
    }
  }
}
