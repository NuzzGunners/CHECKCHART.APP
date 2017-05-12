import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Chart1Component } from './chart1/chart1.component';

import { routingChart } from './chart.routing';

import { ChartModule as Highcharts } from 'angular2-highcharts';
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';

import { ChartService } from './shared/services/chart.service';

import { MyDatePickerModule } from 'mydatepicker';

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
    routingChart,
    Highcharts,
    MyDatePickerModule
  ],
  declarations: [Chart1Component],
  providers: [ChartService, {
    provide: HighchartsStatic,
    useFactory: highchartsFactory
  }]
})
export class ChartModule { }
