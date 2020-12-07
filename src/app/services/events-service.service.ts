import {EventEmitter, Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventsServiceService {

  public userRegistered: EventEmitter<Observable<boolean>>;
  public newFav: EventEmitter<boolean>;

  constructor() {
    this.userRegistered = new EventEmitter();
    this.newFav = new EventEmitter<boolean>();
  }
  public trigger(): void {
    console.log(window.localStorage.getItem('info-alumno') !== null);
    this.userRegistered.emit(of(window.localStorage.getItem('info-alumno') !== null));
  }

  public newFavEvent(): void {
    this.newFav.emit(true);
  }

}
