import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule }  from '@angular/router';
import { HttpModule }  from '@angular/http';

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
import { UserpositionComponent } from './userposition/userposition.component';
import { SearchFilterPipe } from './shared/utils/search-filter.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpModule,
    MaterializeModule,
    routingSetting 
  ],
  declarations: [
    SettingComponent, 
    PositionComponent, 
    ReasonComponent, 
    RoleComponent, 
    UserComponent, 
    UserpositionComponent, 
    SearchFilterPipe
    ],
    providers: [
      PositionService,
      RoleService,
      ReasonService,
      UserService,
      UserpositionService
    ]
})
export class SettingModule { }
