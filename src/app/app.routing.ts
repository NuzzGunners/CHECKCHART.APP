import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CheckchartComponent } from './checkchart/checkchart.component';
import { LoginComponent } from './login/login.component';
import { ReportComponent } from './report/report.component';

import { AuthReceiveService } from './shared/services/auth-receive.service';
import { AuthSendService } from './shared/services/auth-send.service';
import { AuthUserService } from './shared/services/auth-user.service';

const appRoutes: Routes = [
    { path: '', component: CheckchartComponent , canActivate: [AuthUserService], data: { title: 'หน้าแรก' } },
    { path: 'login', component: LoginComponent, data: { title: 'เข้าสู่ระบบ' } },
    { path: 'report', component: ReportComponent , canActivate: [AuthUserService], data: { title: 'รายงาน' } },
    { path: '**', redirectTo: '' }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);