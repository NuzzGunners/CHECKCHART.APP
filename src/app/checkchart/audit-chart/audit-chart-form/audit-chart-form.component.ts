import { Component, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { Patient, PatientMultiSaveItem, Checkchart, Audit } from '../../shared/services/checkchart';
import { NotificationService } from '../../../shared/utils/notification.service';

@Component({
  selector: 'app-audit-chart-form',
  templateUrl: './audit-chart-form.component.html',
  styleUrls: ['./audit-chart-form.component.css']
})
export class AuditChartFormComponent implements AfterViewInit {

  @Output() patientSearch: EventEmitter<string> = new EventEmitter();
  txtSearchAN = '';
  public myFocusTriggeringEventEmitter = new EventEmitter<boolean>();

  @Input() patient: Patient;
  @Input() listPatients: Audit;
  @Input() category: any;
  @Input() doctor: any;
  @Input() coder: any;
  @Input() ward: any;
  @Input() nurse: any;
  @Input() userLogin: any;
  @Output() auditSave = new EventEmitter();
  @Output() auditDelete = new EventEmitter();
  @Input() isLoading: boolean = false;

  constructor(private notificationService: NotificationService) { }

  ngAfterViewInit() {
    this.myFocusTriggeringEventEmitter.emit(true);
  }

  search(event: KeyboardEvent): void {
    this.patientSearch.emit(this.txtSearchAN.trim());
    this.txtSearchAN = '';
  }

  saveAudit(audit) {
    this.auditSave.emit(audit);
    this.myFocusTriggeringEventEmitter.emit(true);
  }

  deleteAudit(audit) {
    this.notificationService.openConfirmationDialog('Are you sure you want to remove '
      + audit.fullname + '?',
      () => {
        this.auditDelete.emit(audit);
        this.myFocusTriggeringEventEmitter.emit(true);
      });

  }

}
