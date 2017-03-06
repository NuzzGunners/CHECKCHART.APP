/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SendChartComponent } from './send-chart.component';

describe('SendChartComponent', () => {
  let component: SendChartComponent;
  let fixture: ComponentFixture<SendChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
