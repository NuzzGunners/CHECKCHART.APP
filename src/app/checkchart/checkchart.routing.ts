import { Routes, RouterModule } from '@angular/router';

import { CheckchartComponent } from './checkchart.component';
import { LogChartComponent } from './log-chart/log-chart.component';
import { ReceiveChartComponent } from './receive-chart/receive-chart.component';
import { ReceiveChartMultipleComponent } from './receive-chart-multiple/receive-chart-multiple.component';
import { SendChartComponent } from './send-chart/send-chart.component';
import { SendChartMultipleComponent } from './send-chart-multiple/send-chart-multiple.component';
import { AuditChartComponent } from './audit-chart/audit-chart.component';
import { AuthReceiveService } from '../shared/services/auth-receive.service';
import { AuthSendService } from '../shared/services/auth-send.service';
import { AuthUserService } from '../shared/services/auth-user.service';
import { AuthAuditService } from '../shared/services/auth-audit.service';

const checkchartRoutes: Routes = [
    { path: 'checkchart', component: CheckchartComponent , canActivate:[AuthUserService], data: { title: 'หน้าแรก' } },
    { path: 'log', component: LogChartComponent , canActivate:[AuthUserService], data: { title: 'Chart Log' } },
    { path: 'receivemultiple', component: ReceiveChartMultipleComponent , canActivate:[AuthReceiveService], data: { title: 'รับ Chart' } },
    { path: 'sendmultiple', component: SendChartMultipleComponent , canActivate:[AuthSendService], data: { title: 'ส่ง Chart' } },
    { path: 'audit', component: AuditChartComponent , canActivate:[AuthAuditService], data: { title: 'Audit Chart' } }
];

export const routingCheckchart = RouterModule.forChild(checkchartRoutes);