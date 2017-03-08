import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { CheckchartService } from '../shared/services/checkchart.service';
import { UserService } from '../../setting/shared/services/user.service';
import { Patient, PatientMultiSaveItem, Checkchart, Audit } from '../shared/services/checkchart';
import { ItemsService } from '../../shared/utils/items.service';
import { NotificationService } from '../../shared/utils/notification.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-audit-chart',
  templateUrl: './audit-chart.component.html',
  styleUrls: ['./audit-chart.component.css']
})
export class AuditChartComponent implements OnInit, OnDestroy {

  userLogin: any;
  isLoading: boolean = false;
  patient: Patient;
  listPatients: Audit;
  checkchart: Checkchart;
  category: any;
  doctor: any;
  coder: any;
  ward: any;
  nurse: any;
  UngetCategories: Subscription;
  UngetDoctors: Subscription;
  UngetCoders: Subscription;
  UngetWards: Subscription;
  UngetNurses: Subscription;

  constructor(
    private checkchartService: CheckchartService,
    private userService: UserService,
    private itemsService: ItemsService,
    private notificationService: NotificationService
  ) {
    this.resetForm();
  }

  ngOnInit() {
    this.userLogin = JSON.parse(sessionStorage.getItem('userLogin'));
    this.getCategories();
    this.getDoctors();
    this.getCoders();
    this.getWards();
    this.getNurses();
  }

  resetForm() {
    this.listPatients = new Audit();
    this.checkchart = new Checkchart();
    this.patient = new Patient();
  }

  getNurses() {
    this.UngetNurses = this.checkchartService.getNurses()
      .subscribe(res => {
        this.nurse = res;
      }, error => {
        this.notificationService.printErrorMessageBl('โหลดข้อมูล Nurses error. ' + error);
      })
  }

  getWards() {
    this.UngetWards = this.checkchartService.getWards()
      .subscribe(res => {
        this.ward = res;
      }, error => {
        this.notificationService.printErrorMessageBl('โหลดข้อมูล Wards error. ' + error);
      })
  }

  getCoders() {
    this.UngetCoders = this.checkchartService.getCoders()
      .subscribe(res => {
        this.coder = res;
      }, error => {
        this.notificationService.printErrorMessageBl('โหลดข้อมูล Coders error. ' + error);
      });
  }

  getCategories() {
    this.UngetCategories = this.checkchartService.getCategories()
      .subscribe(res => {
        this.category = res;
      }, error => {
        this.notificationService.printErrorMessageBl('โหลดข้อมูล Categories error. ' + error);
      })
  }

  getDoctors() {
    this.UngetDoctors = this.checkchartService.getDoctors()
      .subscribe(res => {
        this.doctor = res;
      }, error => {
        this.notificationService.printErrorMessageBl('โหลดข้อมูล Doctors error. ' + error);
      })
  }

  searchPatient(txtSearch) {
    if (txtSearch.length > 0) {
      this.isLoading = true;

      this.getPatient(txtSearch);

    }
  }

  getPatient(an) {
    this.checkchartService.getPatient(an)
      .subscribe(res => {
        if (res[0]) {

          this.getPatientCheckchart(res[0]);
          this.patient = res[0];

          this.isLoading = false;
          this.notificationService.printSuccessMessageBl('โหลดข้อมูล Patient success.');
        } else {
          this.notificationService.printErrorMessageBl('โหลดข้อมูล Patient error. ไม่พบข้อมูล');
          this.isLoading = false;
          this.resetForm();
        }
      }, error => {
        this.notificationService.printErrorMessageBl('โหลดข้อมูล Patient error. ' + error);
        this.resetForm();
      });
  }

  getPatientCheckchart(patient) {
    this.checkchartService.getLastPatientCheckchart(patient.an)
      .subscribe(lastcheckchart => {

        if (lastcheckchart.receivebyposition === 63 && lastcheckchart.sendtoposition == null) {

          this.getPatientAudit(patient);

        } else {

          this.checkchartService.getAuditchart(patient.an)
            .subscribe(res => {

              if (res.length > 0) {

                this.getPatientAudit(patient);

              } else {
                this.notificationService.printErrorMessageBl('Chart ไม่ได้อยู่ที่คุณ.');
                this.isLoading = false;
                this.resetForm();
              }

            }, error => {
              console.log('โหลดข้อมูล Auditchart error. ' + error);
              this.isLoading = false;
              this.resetForm();
            });
        }

      }, error => {
        this.notificationService.printErrorMessageBl('โหลดข้อมูล Checkchart error. ' + error);
      });
  }

  getPatientAudit(patient) {
    this.checkchartService.getAuditchart(patient.an)
      .subscribe(res => {
        if (res[0]) {
          this.listPatients.hn = patient.hn;
          this.listPatients.an = patient.an;
          this.listPatients.fullname = patient.fullname;
          this.listPatients.id = res[0].id;
          this.listPatients.doctor = (res[0].doctor == '' || res[0].doctor == null) ? '' : res[0].doctor + ' : ' + res[0].doctorname;
          this.listPatients.category = res[0].category + ' : ' + res[0].categoryname;
          this.listPatients.doctormaster = res[0].doctormaster + ' : ' + res[0].doctormastername;
          this.listPatients.doctorconsult = (res[0].doctorconsult == '' || res[0].doctorconsult == null) ? '' : res[0].doctorconsult + ' : ' + res[0].doctorconsultname;
          this.listPatients.los = res[0].los;
          this.listPatients.ward = res[0].ward + ' : ' + res[0].wardname;
          this.listPatients.coder = (res[0].coder == '' || res[0].coder == null) ? '' : res[0].coder + ' : ' + res[0].codername;
          this.listPatients.rwbefore = res[0].rwbefore;
          this.listPatients.rwafter = res[0].rwafter;
          this.listPatients.nurse = (res[0].nurse == '' || res[0].nurse == null) ? '' : res[0].nurse + ' : ' + res[0].nursename;
        } else {
          this.listPatients.hn = patient.hn;
          this.listPatients.an = patient.an;
          this.listPatients.fullname = patient.fullname;
          this.listPatients.id = '00000000-0000-0000-0000-000000000000';
          this.listPatients.doctor = '';
          this.listPatients.doctorconsult = '';
          this.listPatients.doctormaster = patient.dischargeDoctor + ' : ' + patient.dischargeDoctorName;
          this.listPatients.category = '';
          this.listPatients.coder = '';
          this.listPatients.rwbefore = null;
          this.listPatients.rwafter = null;
          this.listPatients.los = patient.los;
          this.listPatients.ward = patient.activeWard + ' : ' + patient.activeWardName;
          this.listPatients.nurse = '';
        }
      }, error => {
        console.log('โหลดข้อมูล Audit error. ' + error);
        this.resetForm();
      });
  }

  saveAudit(audit) {
    if (audit.id == '00000000-0000-0000-0000-000000000000') {
      this.checkchartService.addAuditchart(audit)
        .subscribe(() => {
          this.notificationService.printSuccessMessageBl('บันทึกข้อมูล Audit success.');
        }, error => {
          this.notificationService.printErrorMessageBl('บันทึกข้อมูล Audit error. ' + error);
        });
    } else {
      this.checkchartService.updateAuditchart(audit)
        .subscribe(() => {
          this.notificationService.printSuccessMessageBl('แก้ไขข้อมูล Audit success.');
        }, error => {
          this.notificationService.printErrorMessageBl('แก้ไขข้อมูล Audit error. ' + error);
        });
    }

    this.resetForm();
  }

  deleteAudit(audit) {
    this.notificationService.openConfirmationDialog('Are you sure you want to remove '
      + audit.fullname + '?',
      () => {
        this.checkchartService.deleteAuditchart(audit)
          .subscribe(() => {
            this.notificationService.printSuccessMessageBl('ลบข้อมูล Audit success.');
            this.resetForm();
          }, error => {
            this.notificationService.printErrorMessageBl('ลบข้อมูล Audit error. ' + error);
          });
      });
  }

  ngOnDestroy() {
    this.UngetCategories.unsubscribe();
    this.UngetDoctors.unsubscribe();
    this.UngetCoders.unsubscribe();
    this.UngetWards.unsubscribe();
    this.UngetNurses.unsubscribe();
  }
}