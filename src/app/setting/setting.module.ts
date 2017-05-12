import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

import { SettingComponent } from './setting.component';
import { routingSetting } from './setting.routing';
import { PositionComponent } from './position/position.component';
import { ReasonComponent } from './reason/reason.component';
import { RoleComponent } from './role/role.component';
import { UserComponent } from './user/user.component';

import { MaterializeModule } from 'angular2-materialize';

import { RoleService } from './shared/services/role.service';
import { PositionService } from './shared/services/position.service';
import { ReasonService } from './shared/services/reason.service';
import { UserService } from './shared/services/user.service';
import { UserpositionService } from './shared/services/userposition.service';
import { MonitorService } from './shared/services/monitor.service';
import { UserpositionComponent } from './userposition/userposition.component';
import { SearchFilterPipe } from './shared/utils/search-filter.pipe';
import { MonitorComponent } from './monitor/monitor.component';

import { CheckchartModule } from '../checkchart/checkchart.module';

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
    routingSetting,
    CheckchartModule,
    Highcharts
  ],
  declarations: [
    SettingComponent,
    PositionComponent,
    ReasonComponent,
    RoleComponent,
    UserComponent,
    UserpositionComponent,
    SearchFilterPipe,
    MonitorComponent
  ],
  providers: [
    PositionService,
    RoleService,
    ReasonService,
    UserService,
    MonitorService,
    UserpositionService, {
      provide: HighchartsStatic,
      useFactory: highchartsFactory
    }
  ]
})
export class SettingModule { }
