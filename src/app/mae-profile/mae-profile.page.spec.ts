import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaeProfilePage } from './mae-profile.page';

describe('MaeProfilePage', () => {
  let component: MaeProfilePage;
  let fixture: ComponentFixture<MaeProfilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaeProfilePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaeProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
