import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { CheckchartService } from '../shared/services/checkchart.service';
import { Patient, PatientMultiSaveItem, Checkchart } from '../shared/services/checkchart';
import { ItemsService } from '../../shared/utils/items.service';
import { NotificationService } from '../../shared/utils/notification.service';

@Component({
    selector: 'app-send-chart-multiple',
    templateUrl: './send-chart-multiple.component.html',
    styleUrls: ['./send-chart-multiple.component.css']
})
export class SendChartMultipleComponent implements OnInit, OnDestroy {

    userLogin: any;
    patient: Patient;
    listPatients = [];
    listpatientMultiSaveItem = [];
    isLoading: boolean = false;
    checkchart: Checkchart;
    sendtouser: any;
    position: number;
    ddlsendtouser: string;
    isSaving: boolean = false;
    groupPosition: string;

    constructor(
        private checkchartService: CheckchartService,
        private itemsService: ItemsService,
        private notificationService: NotificationService
    ) {
        this.resetForm();
    }

    ngOnInit() {
        this.userLogin = JSON.parse(sessionStorage.getItem('userLogin'));
        this.position = this.userLogin.position;
        if (this.position === 55 || this.position === 63) {
            this.getSendToUsers();
        }
    }

    ddlsendtouserSelect(user) {
        this.ddlsendtouser = user;
    }

    positionToSendChanged(event) {
        this.groupPosition = event;
        this.ddlsendtouser = null;
    }

    resetForm() {
        this.listpatientMultiSaveItem = [];
        this.checkchart = new Checkchart();
        this.patient = new Patient();
    }

    searchPatient(txtSearch) {
        if (txtSearch.length > 0) {
            this.isLoading = true;
            if (this.listpatientMultiSaveItem.length < 50) {
                this.getPatient(txtSearch);
            } else {
                this.notificationService.printErrorMessage('ส่ง Chart ได้สูงสุด ' + this.listpatientMultiSaveItem.length + ' Chart');
                this.isLoading = false;
            }
        }
    }

    getPatient(an) {
        this.checkchartService.getPatient(an)
            .subscribe(res => {
                if (res[0]) {
                    this.patient = res[0];

                    this.getPatientCheckchart(this.patient.an);

                    this.notificationService.printSuccessMessage('โหลดข้อมูล Patient success.');
                } else {
                    this.notificationService.printErrorMessage('โหลดข้อมูล Patient failed. ไม่พบข้อมูล');
                    this.isLoading = false;
                }

            }, error => {
                this.notificationService.printErrorMessage('โหลดข้อมูล Patient error. ' + error);
                this.isLoading = false;
            });
    }

    getPatientCheckchart(an) {

        this.checkchartService.getLastPatientCheckchart(an)
            .subscribe(lastcheckchart => {

                if (lastcheckchart.id) {

                    if (lastcheckchart.receivebyposition == this.userLogin.position && lastcheckchart.sendtoposition == null) {

                        this.checkchart = lastcheckchart;

                        this.addlistpatients(this.patient);
                    } else {
                        this.notificationService.printErrorMessage('Chart ยังไม่ได้รับ / Chart ส่งแล้ว.');
                    }

                    this.isLoading = false;

                } else {
                    this.notificationService.printErrorMessage('ยังไม่ได้รับ Chart นี้');

                    this.isLoading = false;
                }

            }, error => {
                this.notificationService.printErrorMessage('โหลดข้อมูล LastPatientCheckchart error. ' + error);

                this.isLoading = false;
            });
    }

    addlistpatients(patient) {
        if (!this.itemsService.checkItemFromArray(this.listPatients, 'an', patient.an)) {

            this.listPatients.push(patient);

            this.listpatientMultiSaveItem.push({
                id: this.checkchart.id,
                an: patient.an,
                sendtobyuser: this.userLogin.username
            });
        }
    }

    savePatient() {
        let sendtoposition, sendtopositionname;

        //53:Ward
        if (this.userLogin.position === 53) {
            sendtoposition = 55;
            sendtopositionname = "Medical Record Receive Chart";
            //55:Medical Record Receive Chart
        } else if (this.userLogin.position === 55) {
            sendtoposition = 56;
            sendtopositionname = "Coder";
            //56:Coder
        } else if (this.userLogin.position === 56) {
            sendtoposition = 57;
            sendtopositionname = "Diag";
            //57:Diag
        } else if (this.userLogin.position === 57) {
            sendtoposition = 58;
            sendtopositionname = "Medical Record Check Chart";
            //58:Medical Record Check Chart
        } else if (this.userLogin.position === 58) {       
            if (this.groupPosition == '2') {
                sendtoposition = 63;
                sendtopositionname = "Audit";
            } else {
                sendtoposition = 59;
                sendtopositionname = "Scan";
            }
            //59:Scan
        } else if (this.userLogin.position === 59) {
            sendtoposition = 60;
            sendtopositionname = "Revenue Keep Center Check Chart";
            //60:Revenue Keep Center Check Chart
        } else if (this.userLogin.position === 60) {
            sendtoposition = 61;
            sendtopositionname = "Revenue Keep Center";
            //61:Revenue Keep Center
        } else if (this.userLogin.position === 61) {
            sendtoposition = 62;
            sendtopositionname = "Shelving IPD";
            //63:Audit
        } else if (this.userLogin.position === 63) {
            if (this.groupPosition == '0') {
                sendtoposition = 56;
                sendtopositionname = "Coder";
            } else {
                sendtoposition = 57;
                sendtopositionname = "Diag";
            }
        }

        let newlistpatientMultiSaveItem = [];
        this.listpatientMultiSaveItem.forEach(i => {
            newlistpatientMultiSaveItem.push({
                id: i.id,
                an: i.an,
                sendtouser: this.ddlsendtouser,
                sendtoposition: sendtoposition,
                sendtobyuser: i.sendtobyuser
            });
        });

        this.isSaving = true;
        this.listPatients = [];

        this.checkchartService.updateCheckchartMultiple(newlistpatientMultiSaveItem)
            .subscribe(() => {
                
                this.notificationService.printSuccessMessage('Chart ส่ง success.');
                this.resetForm();
                this.isSaving = false;
                
            }, error => {
                
                this.notificationService.printErrorMessage('Chart ส่ง error. ' + error);
                this.resetForm();
                this.isSaving = false;
                
            });
    }

    removePatient(an) {
        this.listPatients = this.listPatients.filter(pt => pt.an !== an);
        this.listpatientMultiSaveItem = this.listpatientMultiSaveItem.filter(pt => pt.an !== an);
    }

    getSendToUsers(): void {
        this.checkchartService.getSendToUsers(this.userLogin.positionName)
            .subscribe(data => {
                this.sendtouser = data;
            }, error => {
                this.notificationService.printErrorMessage('โหลดข้อมูล SendToUsers error. ' + error);
            });
    }

    ngOnDestroy() {

    }
}