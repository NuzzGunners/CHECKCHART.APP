/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LogChartListComponent } from './log-chart-list.component';

describe('LogChartListComponent', () => {
  let component: LogChartListComponent;
  let fixture: ComponentFixture<LogChartListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogChartListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogChartListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
