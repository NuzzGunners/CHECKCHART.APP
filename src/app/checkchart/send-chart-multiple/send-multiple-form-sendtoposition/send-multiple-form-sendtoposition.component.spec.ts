/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SendMultipleFormSendtopositionComponent } from './send-multiple-form-sendtoposition.component';

describe('SendMultipleFormSendtopositionComponent', () => {
  let component: SendMultipleFormSendtopositionComponent;
  let fixture: ComponentFixture<SendMultipleFormSendtopositionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendMultipleFormSendtopositionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendMultipleFormSendtopositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
