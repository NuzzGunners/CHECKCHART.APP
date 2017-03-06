import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-audit-chart-form',
  templateUrl: './audit-chart-form.component.html',
  styleUrls: ['./audit-chart-form.component.css']
})
export class AuditChartFormComponent {

  @Output() patientSearch: EventEmitter<string> = new EventEmitter();
  txtSearchAN = '';

  constructor() { }

  search(event: KeyboardEvent): void {
    this.patientSearch.emit(this.txtSearchAN.trim());
    this.txtSearchAN = '';
  }

}
