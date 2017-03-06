import { Component, OnInit } from '@angular/core';
import { CheckchartService } from '../shared/services/checkchart.service';
import { Patient, Checkchart, deleteCheckchartLog } from '../shared/services/checkchart';
import { NotificationService } from '../../shared/utils/notification.service';

@Component({
  selector: 'app-log-chart',
  templateUrl: './log-chart.component.html',
  styleUrls: ['./log-chart.component.css']
})
export class LogChartComponent implements OnInit {

  userLogin: any;
  lastId: any;
  itemLog: deleteCheckchartLog;

  isLoading: boolean = false;
  checkchartLog: Checkchart[];

  patient: Patient;
  doctorAudit = {};
  nurseAudit = {};

  constructor(
    private checkchartService: CheckchartService,
    private notificationService: NotificationService
  ) {
    this.resetForm();
  }

  ngOnInit() {
    this.userLogin = JSON.parse(sessionStorage.getItem('userLogin'));
  }

  resetForm() {
    this.doctorAudit = {};
    this.nurseAudit = {};
    this.checkchartLog = [];
    this.patient = new Patient();
    this.itemLog = new deleteCheckchartLog();
  }

  searchPatient(txtSearch) {
    if (txtSearch.length > 0) {
      this.isLoading = true;

      this.checkchartService.getPatient(txtSearch)
        .subscribe(pt => {
          if (pt.length > 0) {
            this.getPatientCheckchartLog(pt[0]);
          } else {
            this.resetForm();
            this.notificationService.printErrorMessage('โหลดข้อมูล Patient failed. ไม่พบข้อมูล');
            this.isLoading = false;
          }
        }, error => {
          this.resetForm();
          this.notificationService.printErrorMessage('โหลดข้อมูล Patient error. ' + error);
          this.isLoading = false;
        });
    }
  }

  getPatientCheckchartLog(patient) {
    this.checkchartService.getPatientCheckchartLog(patient.an)
      .subscribe(log => {

        if (log.length > 0) {

          this.patient = patient;
          this.checkchartLog = log;
          this.lastId = log[log.length - 1].id;

          this.checkchartService.getAuditchart(patient.an)
            .subscribe(a => {
              if (a.length > 0) {
                if (a[0].doctor) {
                  this.checkchartService.getDoctor(a[0].doctor)
                    .subscribe(doc => {
                      this.doctorAudit = doc;
                    });
                } else {
                  this.doctorAudit = {};
                }

                if (a[0].nurse) {
                  this.checkchartService.getNurse(a[0].nurse)
                    .subscribe(nurse => {
                      this.nurseAudit = nurse;
                    });
                } else {
                  this.nurseAudit = {};
                }
              }

              this.isLoading = false;
            }, error => {
              this.notificationService.printErrorMessage('โหลดข้อมูล Audit Doctor failed. ' + error);
              this.isLoading = false;
              this.resetForm();
            });
        } else {
          this.resetForm();
          this.notificationService.printErrorMessage('โหลดข้อมูล Chart Log failed. ไม่พบข้อมูล');
          this.isLoading = false;
        }
      }, error => {
        this.isLoading = false;
        this.notificationService.printErrorMessage('โหลดข้อมูล Chart Log error. ' + error);
        this.resetForm();
      });
  }

  deleteLog(event) {
    this.notificationService.openConfirmationDialog('Are you sure you want to remove '
      + event.an + '?',
      () => {

        this.itemLog.id = event.id;
        this.itemLog.sendtodatetime = event.sendtodatetime;
        this.itemLog.cxlbyuser = this.userLogin.username;
        this.itemLog.cxlbyuserreason = 1;

        this.checkchartService.deletePatientLog(this.itemLog)
          .subscribe(() => {
            if (event.sendtodatetime == null) {
              this.notificationService.printSuccessMessage('Chart รับ ยกเลิก success.');
            } else {
              this.notificationService.printSuccessMessage('Chart ส่ง ยกเลิก success.');
            }
            this.resetForm();
          }, error => {
            this.notificationService.printErrorMessage('Delete Chart Log error. ' + error);
          });
      });
  }
}