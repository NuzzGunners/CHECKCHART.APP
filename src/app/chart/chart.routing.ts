import { Routes, RouterModule } from '@angular/router';

import { Chart1Component } from './chart1/chart1.component';

import { AuthUserService } from '../shared/services/auth-user.service';

const chartRoutes: Routes = [
    { path: 'chart1', component: Chart1Component , canActivate:[AuthUserService], data: { title: 'Chart1' } }
];

export const routingChart = RouterModule.forChild(chartRoutes);