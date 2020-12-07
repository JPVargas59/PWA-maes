import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivosPage } from './activos.page';

describe('ActivosPage', () => {
  let component: ActivosPage;
  let fixture: ComponentFixture<ActivosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
