import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-log-chart-detail-audit',
  templateUrl: './log-chart-detail-audit.component.html',
  styleUrls: ['./log-chart-detail-audit.component.css']
})
export class LogChartDetailAuditComponent  {

  @Input() doctorAudit: any;
  @Input() nurseAudit: any;

}
