/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LogChartComponent } from './log-chart.component';

describe('LogChartComponent', () => {
  let component: LogChartComponent;
  let fixture: ComponentFixture<LogChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
