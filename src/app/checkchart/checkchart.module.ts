import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

import { CheckchartComponent } from './checkchart.component';
import { routingCheckchart } from './checkchart.routing';

import { ReceiveChartComponent } from './receive-chart/receive-chart.component';
import { ReceiveChartMultipleComponent } from './receive-chart-multiple/receive-chart-multiple.component';
import { ReceiveMultipleFormComponent } from './receive-chart-multiple/receive-multiple-form/receive-multiple-form.component';
import { ReceiveMultipleListComponent } from './receive-chart-multiple/receive-multiple-list/receive-multiple-list.component';
import { ReceiveMultipleFormSaveComponent } from './receive-chart-multiple/receive-multiple-form-save/receive-multiple-form-save.component';

import { SendChartComponent } from './send-chart/send-chart.component';
import { SendChartMultipleComponent } from './send-chart-multiple/send-chart-multiple.component';
import { SendMultipleFormComponent } from './send-chart-multiple/send-multiple-form/send-multiple-form.component';
import { SendMultipleFormSaveComponent } from './send-chart-multiple/send-multiple-form-save/send-multiple-form-save.component';
import { SendMultipleListComponent } from './send-chart-multiple/send-multiple-list/send-multiple-list.component';

import { MaterializeModule } from 'angular2-materialize';

import { CheckchartService } from './shared/services/checkchart.service';

import { SendMultipleFormSendtopositionComponent } from './send-chart-multiple/send-multiple-form-sendtoposition/send-multiple-form-sendtoposition.component';
import { LogChartComponent } from './log-chart/log-chart.component';
import { LogChartFormComponent } from './log-chart/log-chart-form/log-chart-form.component';
import { LogChartListComponent } from './log-chart/log-chart-list/log-chart-list.component';
import { AuditChartComponent } from './audit-chart/audit-chart.component';
import { AuditChartFormComponent } from './audit-chart/audit-chart-form/audit-chart-form.component';
import { AuditChartFormDetailComponent } from './audit-chart/audit-chart-form-detail/audit-chart-form-detail.component';
import { LogChartDetailComponent } from './log-chart/log-chart-detail/log-chart-detail.component';
import { LogChartDetailAuditComponent } from './log-chart/log-chart-detail-audit/log-chart-detail-audit.component';

import { SharedModule } from '../shared/modules/shared.module';

import { ChartModule as Highcharts } from 'angular2-highcharts';
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';

export declare let require: any;

export function highchartsFactory() {
  const hc = require('highcharts/highstock');
  const dd = require('highcharts/modules/exporting');
  dd(hc);

  return hc;
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpModule,
    MaterializeModule,
    routingCheckchart,
    SharedModule,
    Highcharts
  ],
  declarations: [
    CheckchartComponent,
    ReceiveChartComponent,
    ReceiveChartMultipleComponent,
    SendChartComponent,
    ReceiveMultipleFormComponent,
    ReceiveMultipleListComponent,
    ReceiveMultipleFormSaveComponent,
    SendChartMultipleComponent,
    SendMultipleFormComponent,
    SendMultipleFormSaveComponent,
    SendMultipleListComponent,
    SendMultipleFormSendtopositionComponent,
    LogChartComponent,
    LogChartFormComponent,
    LogChartListComponent,
    AuditChartComponent,
    AuditChartFormComponent,
    AuditChartFormDetailComponent,
    LogChartDetailComponent,
    LogChartDetailAuditComponent
  ],
  providers: [
    CheckchartService,
    {
      provide: HighchartsStatic,
      useFactory: highchartsFactory
    }]
})
export class CheckchartModule { }
