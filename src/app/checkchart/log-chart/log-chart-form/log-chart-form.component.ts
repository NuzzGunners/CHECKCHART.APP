import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-log-chart-form',
  templateUrl: './log-chart-form.component.html',
  styleUrls: ['./log-chart-form.component.css']
})
export class LogChartFormComponent {

  @Output() patientSearch: EventEmitter<string> = new EventEmitter();
  txtSearchAN = '';

  search(event: KeyboardEvent): void {
    this.patientSearch.emit(this.txtSearchAN.trim());
    this.txtSearchAN = '';
  }
}
