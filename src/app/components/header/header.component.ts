import {Component, Input, OnInit} from '@angular/core';
import {UtilsService} from '../../utils.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  @Input() title = 'Titulo';
  @Input() back;

  constructor(
      private utils: UtilsService
  ) { }

  ngOnInit() {}

  goto(route) {
    this.utils.goto(route);
  }
}
