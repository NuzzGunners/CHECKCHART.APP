import { Component, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { Patient, Checkchart, deleteCheckchartLog } from '../../shared/services/checkchart';
import { NotificationService } from '../../../shared/utils/notification.service';

@Component({
  selector: 'app-log-chart-form',
  templateUrl: './log-chart-form.component.html',
  styleUrls: ['./log-chart-form.component.css']
})
export class LogChartFormComponent implements AfterViewInit {

  @Output() patientSearch: EventEmitter<string> = new EventEmitter();
  txtSearchAN = '';
  public myFocusTriggeringEventEmitter = new EventEmitter<boolean>();
  @Input() isLoading: boolean = false;
  @Input() patient: Patient;
  @Input() doctorAudit: any;
  @Input() nurseAudit: any;
  @Input() checkchartLog: Checkchart[];
  @Input() lastId: any;
  @Input() userLogin: any;
  @Output() logDelete = new EventEmitter();

  constructor(private notificationService: NotificationService) {

  }

  search(event: KeyboardEvent): void {
    this.patientSearch.emit(this.txtSearchAN.trim());
    this.txtSearchAN = '';
  }

  ngAfterViewInit() {
    this.myFocusTriggeringEventEmitter.emit(true);
  }

  deleteLog(event) {
    this.notificationService.openConfirmationDialog('Are you sure you want to remove '
      + event.an + '?',
      () => {

        this.myFocusTriggeringEventEmitter.emit(true);
        this.logDelete.emit(event);

      });
  }
}
