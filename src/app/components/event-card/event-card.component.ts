import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss'],
})
export class EventCardComponent implements OnInit {

  @Input() title = 'Titulo';
  @Input() detail = 'extra';
  @Input() description = 'Descripción';
  constructor() { }

  ngOnInit() {}

}
