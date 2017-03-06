import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CheckchartService } from '../shared/services/checkchart.service';
import { Patient, Checkchart } from '../shared/services/checkchart';
import { NotificationService } from '../../shared/utils/notification.service';
import { MaterializeAction } from 'angular2-materialize';

@Component({
    selector: 'app-send-chart',
    templateUrl: './send-chart.component.html',
    styleUrls: ['./send-chart.component.css']
})
export class SendChartComponent implements OnInit {

    form: FormGroup;
    patient: Patient = new Patient();
    checkchart: Checkchart = new Checkchart();
    updatecheckchart: Checkchart = new Checkchart();
    deletecheckchart: Checkchart = new Checkchart();
    modalActions = new EventEmitter<string | MaterializeAction>();
    modalDeleteActions = new EventEmitter<string | MaterializeAction>();
    modalHeader: string;
    onSend: boolean = false;
    userLogin: any;
    selectUserOptions: any;
    checkchartLog: Checkchart[];
    isLoading: boolean = false;
    itemInLineLog: any;
    lastId: any;
    selectReasonOptions: any;

    constructor(
        formBuilder: FormBuilder,
        private checkchartService: CheckchartService,
        private notificationService: NotificationService) {
        this.form = formBuilder.group({
            /*id: ['', [
            ]],
            an: ['', [
            ]],
            sendtopositionname: ['', [
            ]],*/
            sendtouser: ['', [
            ]],
            searchAN: ['', [
            ]]
        });
    }

    ngOnInit() {
        this.userLogin = JSON.parse(sessionStorage.getItem('userLogin'));
        this.getSendToUsers();
        this.getReasons();
        //this.form.get('an').disable();
        //this.form.get('sendtopositionname').disable();
    }

    save(): void {
        var data = this.form.value;
        this.updatecheckchart = new Checkchart();
        this.updatecheckchart.id = this.checkchart.id;
        this.updatecheckchart.an = this.checkchart.an;
        this.updatecheckchart.sendtouser = data.sendtouser == '' ? null : data.sendtouser;
        this.updatecheckchart.sendtoposition = this.checkchart.sendtoposition;
        this.updatecheckchart.sendtobyuser = this.checkchart.sendtobyuser;

        let el = document.getElementById("searchAN");
        el.focus();
        this.form.get('searchAN').setValue("");

        //console.log(this.updatecheckchart);

        this.checkchartService.updateCheckchart(this.updatecheckchart)
            .subscribe(() => {
                //this.notificationService.printSuccessMessage(this.updatecheckchart.an + ' has been updated');
                this.notificationService.printSuccessMessage('Chart ส่ง success.');
            }, error => {
                this.notificationService.printErrorMessage('Chart ส่ง failed. ' + error);
            });

        this.patient = new Patient();
        this.checkchartLog = [];
        this.onSend = false;
    }

    searchPatient(event: any): void {
        if (event.target.value.trim().length > 0) {
            this.isLoading = true;

            this.checkchartService.getPatientCheckchartLog(event.target.value)
                .subscribe(res => {
                    this.checkchartLog = res
                    //console.log(this.checkchartLog);
                    //console.log('getPatientCheckchartLog success.');
                    //this.isLoading = false;
                }, error => {
                    //console.log('Failed to getPatientCheckchartLog. ' + error);
                    //this.isLoading = false;
                });

            this.checkchartService.getPatient(event.target.value)
                .subscribe(res => {
                    if (res[0]) {
                        this.patient = res[0];
                        this.form.get('searchAN').setValue(this.patient.an + ' ' + this.patient.fullname);
                        this.isLoading = false;

                        this.checkchartService.getPatientCheckchartByReceive(res[0].an, this.userLogin.position)
                            //this.checkchartService.getPatientCheckchartByReceive(res[0].an, username)
                            .subscribe(resCheckchart => {
                                //console.log(resCheckchart[0]);
                                if (resCheckchart[0]) {
                                    this.checkchartService.getPatientCheckchart(res[0].an)
                                        .subscribe(resLastCheckchart => {
                                            if (resLastCheckchart[0]) this.lastId = resLastCheckchart[0].id;

                                            //console.log('getPatientCheckchart success.');
                                            //this.isLoading = false;
                                        }, error => {
                                            //console.log('Failed to getPatientCheckchart. ' + error);
                                            //this.isLoading = false;
                                        });

                                    //console.log(resCheckchart[0]);

                                    if (resCheckchart[0].receivebyposition == this.userLogin.position && resCheckchart[0].sendtodatetime == null) {
                                        //if (resCheckchart[0].receivebyuser == username && resCheckchart[0].sendtouser == null) {
                                        this.checkchart = resCheckchart[0];
                                        this.onSend = true;
                                    } else {
                                        this.onSend = false;
                                        this.notificationService.printErrorMessage('Chart ยังไม่ได้รับ / Chart ส่งแล้ว.');
                                    }
                                } else {
                                    this.notificationService.printErrorMessage('ยังไม่ได้รับ Chart นี้');
                                }
                                //console.log('getPatientCheckchartByReceive success.');
                                //this.isLoading = false;
                            }, error => {
                                //console.log('Failed to getPatientCheckchartByReceive. ' + error);
                                //this.isLoading = false;
                            });

                        this.notificationService.printSuccessMessage('โหลดข้อมูล Patient success.');
                    } else {
                        this.notificationService.printErrorMessage('โหลดข้อมูล Patient failed. ไม่พบข้อมูล');
                        this.patient = new Patient();
                        this.onSend = false;
                        this.isLoading = false;
                    }

                    //console.log('getPatient success.');

                    //this.isLoading = false;
                }, error => {
                    this.notificationService.printErrorMessage('โหลดข้อมูล Patient error. ' + error);
                    //console.log('Failed to getPatient. ' + error);
                    //this.isLoading = false;
                    this.patient = new Patient();
                    this.onSend = false;
                });

            //this.isLoading = true;

        } else {
            this.patient = new Patient();
            //this.isLoading = true;
        }
    }

    sendPopup(event: any): void {
        event.preventDefault();
        this.modalActions.emit({ action: "modal", params: ['open'] });
        this.modalHeader = 'Send Chart';

        if (this.userLogin.position == "53") {
            this.checkchart.sendtoposition = 55;
            this.checkchart.sendtopositionname = "Medical Record Receive Chart";
        } else if (this.userLogin.position == "55") {
            this.checkchart.sendtoposition = 56;
            this.checkchart.sendtopositionname = "Coder";
        } else if (this.userLogin.position == "56") {
            this.checkchart.sendtoposition = 57;
            this.checkchart.sendtopositionname = "Diag";
        } else if (this.userLogin.position == "57") {
            this.checkchart.sendtoposition = 58;
            this.checkchart.sendtopositionname = "Medical Record Check Chart";
        } else if (this.userLogin.position == "58") {
            this.checkchart.sendtoposition = 59;
            this.checkchart.sendtopositionname = "Scan";
        } else if (this.userLogin.position == "59") {
            this.checkchart.sendtoposition = 60;
            this.checkchart.sendtopositionname = "Revenue Keep Center Check Chart";
        } else if (this.userLogin.position == "60") {
            this.checkchart.sendtoposition = 61;
            this.checkchart.sendtopositionname = "Revenue Keep Center";
        } else if (this.userLogin.position == "61") {
            this.checkchart.sendtoposition = 62;
            this.checkchart.sendtopositionname = "Shelving IPD";
        }

        //let username = "NUZZ";
        this.checkchart.sendtobyuser = this.userLogin.username;
        this.onSend = true;
    }

    deletePopup(item: any, event: any): void {
        event.preventDefault();
        this.modalDeleteActions.emit({ action: "modal", params: ['open'] });
        this.itemInLineLog = item;
        this.itemInLineLog.lastId = this.lastId;
        console.log(this.itemInLineLog);
    }

    delete(): void {
        //let username = "NUZZ";
        //this.itemInLineLog.cxlbyuser = username;
        this.deletecheckchart = new Checkchart();
        this.deletecheckchart.id = this.itemInLineLog.id;

        this.checkchartService.deletePatientLog(this.deletecheckchart)
            .subscribe(() => {
                this.notificationService.printSuccessMessage('Chart ส่ง ยกเลิก success.');
            }, error => {
                console.log('Failed to deletePatientLog. ' + error);
            });

        let el = document.getElementById("searchAN");
        el.focus();
        this.form.get('searchAN').setValue("");
        this.patient = new Patient();
        this.checkchartLog = [];
        this.onSend = false;
    }

    closeDeleteModal() {
        this.modalDeleteActions.emit({ action: "modal", params: ['close'] });
    }

    closeModal() {
        this.modalActions.emit({ action: "modal", params: ['close'] });
    }

    getSendToUsers(): void {
        //let positionName = "Medical Record Receive Chart";
        this.checkchartService.getSendToUsers(this.userLogin.positionName)
            //this.checkchartService.getSendToUsers(positionName)
            .subscribe(data => {
                this.selectUserOptions = data;

                //console.log('getSendToUsers success.');
            }, error => {
                //console.log('Failed to getSendToUsers. ' + error);
            });
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