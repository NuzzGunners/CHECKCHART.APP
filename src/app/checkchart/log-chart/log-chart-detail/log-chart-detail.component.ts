import { Component, Input } from '@angular/core';
import { Patient, Checkchart } from '../../shared/services/checkchart';

@Component({
  selector: 'app-log-chart-detail',
  templateUrl: './log-chart-detail.component.html',
  styleUrls: ['./log-chart-detail.component.css']
})
export class LogChartDetailComponent {

  @Input() patient: any;

}
