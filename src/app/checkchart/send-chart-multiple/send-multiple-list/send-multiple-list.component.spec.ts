/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SendMultipleListComponent } from './send-multiple-list.component';

describe('SendMultipleListComponent', () => {
  let component: SendMultipleListComponent;
  let fixture: ComponentFixture<SendMultipleListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendMultipleListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendMultipleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
