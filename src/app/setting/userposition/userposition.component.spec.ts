/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UserpositionComponent } from './userposition.component';

describe('UserpositionComponent', () => {
  let component: UserpositionComponent;
  let fixture: ComponentFixture<UserpositionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserpositionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserpositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
