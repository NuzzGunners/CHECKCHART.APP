import { Routes, RouterModule } from '@angular/router';

import { RoleComponent } from './role/role.component';
import { ReasonComponent } from './reason/reason.component';
import { PositionComponent } from './position/position.component';
import { UserComponent } from './user/user.component';
import { UserpositionComponent } from './userposition/userposition.component';
import { MonitorComponent } from './monitor/monitor.component';
import { AuthAdminService } from '../shared/services/auth-admin.service';

const settingRoutes: Routes = [
    { path: 'role', component: RoleComponent , canActivate:[AuthAdminService], data: { title: 'Role' } },
    { path: 'reason', component: ReasonComponent , canActivate:[AuthAdminService], data: { title: 'Reason' } },
    { path: 'position', component: PositionComponent , canActivate:[AuthAdminService], data: { title: 'Position' } },
    { path: 'user', component: UserComponent , canActivate:[AuthAdminService], data: { title: 'User' } },
    { path: 'userposition', component: UserpositionComponent , canActivate:[AuthAdminService], data: { title: 'UserPosition' } },
    { path: 'monitor', component: MonitorComponent , canActivate:[AuthAdminService], data: { title: 'Monitor' } }
];

export const routingSetting = RouterModule.forChild(settingRoutes);