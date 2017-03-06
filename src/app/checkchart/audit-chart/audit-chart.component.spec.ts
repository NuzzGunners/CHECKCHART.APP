/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AuditChartComponent } from './audit-chart.component';

describe('AuditChartComponent', () => {
  let component: AuditChartComponent;
  let fixture: ComponentFixture<AuditChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuditChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
