import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CheckchartService } from '../shared/services/checkchart.service';
import { Patient, Checkchart } from '../shared/services/checkchart';
import { NotificationService } from '../../shared/utils/notification.service';
import { MaterializeAction } from 'angular2-materialize';

@Component({
  selector: 'app-receive-chart',
  templateUrl: './receive-chart.component.html',
  styleUrls: ['./receive-chart.component.css']
})
export class ReceiveChartComponent implements OnInit {

  form: FormGroup;
  patient: Patient = new Patient();
  checkchart: Checkchart = new Checkchart();
  addcheckchart: Checkchart = new Checkchart();
  deletecheckchart: Checkchart = new Checkchart();
  modalActions = new EventEmitter<string | MaterializeAction>();
  modalDeleteActions = new EventEmitter<string | MaterializeAction>();
  modalHeader: string;
  onReceive: boolean = false;
  userLogin: any;
  checkchartLog: Checkchart[];
  btnReceiveChartLabel: string = "Receive Chart";
  isLoading: boolean = false;
  itemInLineLog: Checkchart = new Checkchart();
  lastId: any;
  selectReasonOptions: any;
  cxlReason: any;

  constructor(
    formBuilder: FormBuilder,
    private checkchartService: CheckchartService,
    private notificationService: NotificationService
  ) {
    this.form = formBuilder.group({
      searchAN: ['', [
      ]],
      cxlReason: ['', [Validators.required
      ]]
    });
  }

  ngOnInit() {
    this.userLogin = JSON.parse(sessionStorage.getItem('userLogin'));
    //this.form.get('an').disable();
    //this.form.get('receivebyuser').disable();
    if (this.userLogin.positionName == "Shelving IPD") {
      this.btnReceiveChartLabel = "Shelving IPD";
    }
    this.getReasons();
  }

  save(): void {
    this.addcheckchart = new Checkchart();
    this.addcheckchart.id = 0;
    this.addcheckchart.an = this.patient.an;

    this.addcheckchart.receivebyuser = this.userLogin.username;
    //let username = "NUZZ";
    //this.checkchart.receivebyuser = username;
    //let position = 53; //Ward
    this.addcheckchart.receivebyposition = this.userLogin.position;

    //var data = this.form.value;
    let el = document.getElementById("searchAN");
    el.focus();
    this.form.get('searchAN').setValue("");

    console.log(this.addcheckchart);

    this.checkchartService.addCheckchart(this.addcheckchart)
      .subscribe(() => {
        //this.notificationService.printSuccessMessage(this.addcheckchart.an + ' has been created');
        this.notificationService.printSuccessMessage('Chart รับ success.');
      }, error => {
        this.notificationService.printErrorMessage('Chart รับ failed. ' + error);
      });
    this.patient = new Patient();
    this.checkchartLog = [];
    this.onReceive = false;
  }

  searchPatient(event: any): void {
    if (event.target.value.trim().length > 0) {
      this.isLoading = true;
      this.checkchartService.getPatientCheckchartLog(event.target.value)
        .subscribe(res => {
          this.checkchartLog = res
          //console.log(res);
          //console.log('getPatientCheckchartLog success.')
          //this.isLoading = false;
        }, error => {
          //console.log('Failed to getPatientCheckchartLog ' + error)
          //this.isLoading = false;
        });

      this.checkchartService.getPatient(event.target.value)
        .subscribe(res => {
          if (res[0]) {
            this.patient = res[0];
            this.isLoading = false;
            this.form.get('searchAN').setValue(this.patient.an + ' ' + this.patient.fullname);

            this.checkchartService.getPatientCheckchart(res[0].an)
              .subscribe(resCheckchart => {

                if (resCheckchart[0]) {
                  this.lastId = resCheckchart[0].id;
                  this.checkchart = resCheckchart[0];

                  if (this.checkchart.receivebypositionname == 'Coder' && this.userLogin.positionName == 'Diag') {
                    this.onReceive = true;
                  } else if (this.checkchart.receivebypositionname == 'Diag' && this.userLogin.positionName == 'Medical Record Check Chart') {
                    this.onReceive = true;
                  } else if (this.checkchart.receivebypositionname == 'Medical Record Check Chart' && this.userLogin.positionName == 'Scan') {
                    this.onReceive = true;
                  } else {

                    //console.log(resCheckchart[0].sendtoposition, this.userLogin.positionName);
                    if ((this.checkchart.sendtouser != null && this.checkchart.sendtopositionname == this.userLogin.positionName && this.checkchart.sendtouser == this.userLogin.username)
                      || (this.checkchart.sendtouser == null && this.checkchart.sendtopositionname == this.userLogin.positionName)
                    ) {
                      this.onReceive = true;
                    } else {
                      this.onReceive = false;
                      this.notificationService.printErrorMessage('Chart ยังไม่ได้ส่งมาที่คุณ / Chart รับแล้ว.');
                    }
                  }

                } else {
                  if (this.userLogin.positionName == "Ward") {
                    this.onReceive = true;
                  } else {
                    this.notificationService.printErrorMessage('Chart ยังไม่ได้ส่งมาที่คุณ.');
                  }
                }

                //console.log('getPatientCheckchart success.');
                //this.isLoading = false;
              }, error => {
                //console.log('Failed to getPatientCheckchart. ' + error);
                //this.isLoading = false;
              });

            this.notificationService.printSuccessMessage('โหลดข้อมูล Patient success.');
          } else {
            this.notificationService.printErrorMessage('โหลดข้อมูล Patient failed. ไม่พบข้อมูล');
            this.patient = new Patient();
            this.onReceive = false;
            this.isLoading = false;
          }

          //console.log('getPatient success.');
          //this.isLoading = false;
        }, error => {
          this.notificationService.printErrorMessage('โหลดข้อมูล Patient error. ' + error);
          //console.log('Failed to getPatient. ' + error);
          //this.isLoading = false;
          this.patient = new Patient();
          this.onReceive = false;
        });

    } else {
      this.patient = new Patient();
      this.onReceive = false;
    }
  }

  receivePopup(event: any): void {
    event.preventDefault();
    this.modalActions.emit({ action: "modal", params: ['open'] });
    this.modalHeader = 'Receive Chart';
    this.onReceive = true;

    //this.checkchart = new Checkchart();
    //this.checkchart.id = 0;
    //this.checkchart.an = this.patient.an;
    //this.checkchart.receivebyuser = this.userLogin.username;
  }

  deletePopup(item: any, event: any): void {
    event.preventDefault();
    this.modalDeleteActions.emit({ action: "modal", params: ['open'] });
    this.itemInLineLog = item;
    console.log(this.itemInLineLog);
  }

  delete(): void {
    //let username = "NUZZ";
    //this.itemInLineLog.cxlbyuser = username;
    //this.itemInLineLog.cxlbyuserreason = this.cxlReason;

    this.deletecheckchart = new Checkchart();
    this.deletecheckchart.id = this.itemInLineLog.id;
    this.deletecheckchart.cxlbyuser = this.userLogin.username;
    this.deletecheckchart.cxlbyuserreason = this.cxlReason;


    this.checkchartService.deletePatientLog(this.deletecheckchart)
      .subscribe(() => {
        this.notificationService.printSuccessMessage('Chart รับ ยกเลิก success.');
      }, error => {
        console.log('Failed to deletePatientLog. ' + error);
      });

    let el = document.getElementById("searchAN");
    el.focus();
    this.form.get('searchAN').setValue("");
    this.patient = new Patient();
    this.checkchart = new Checkchart();
    this.checkchartLog = [];
    this.onReceive = false;
  }

  closeDeleteModal() {
    this.modalDeleteActions.emit({ action: "modal", params: ['close'] });
  }

  closeModal() {
    this.modalActions.emit({ action: "modal", params: ['close'] });
  }

  getReasons(): void {
    this.checkchartService.getReasons()
      .subscribe(data => {
        this.selectReasonOptions = data;

        //console.log('getReasons success.');
      }, error => {
        //console.log('Failed to getReasons. ' + error);
      });
  }
}