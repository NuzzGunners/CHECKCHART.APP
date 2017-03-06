import { Component, OnInit, Input } from '@angular/core';
import { CheckchartService } from '../shared/services/checkchart.service';
import { Patient, PatientMultiSaveItem, Checkchart } from '../shared/services/checkchart';
import { ItemsService } from '../../shared/utils/items.service';
import { NotificationService } from '../../shared/utils/notification.service';

@Component({
    selector: 'app-receive-chart-multiple',
    templateUrl: './receive-chart-multiple.component.html',
    styleUrls: ['./receive-chart-multiple.component.css']
})
export class ReceiveChartMultipleComponent implements OnInit {

    userLogin: any;
    patient: Patient;
    listPatients = [];
    listpatientMultiSaveItem = [];
    isLoading: boolean = false;
    isSaving: boolean = false;

    constructor(
        private checkchartService: CheckchartService,
        private itemsService: ItemsService,
        private notificationService: NotificationService
    ) {
        this.resetForm();
    }

    ngOnInit() {
        this.userLogin = JSON.parse(sessionStorage.getItem('userLogin'));
    }

    resetForm() {
        //this.listPatients = [];
        this.listpatientMultiSaveItem = [];
        this.patient = new Patient();
    }

    searchPatient(txtSearch) {
        if (txtSearch.length > 0) {
            this.isLoading = true;
            if (this.listpatientMultiSaveItem.length < 50) {
                this.getPatient(txtSearch);
            } else {
                this.notificationService.printErrorMessage('รับ Chart ได้สูงสุด ' + this.listpatientMultiSaveItem.length + ' Chart');
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

                    //56:Coder===63:Audit
                    if (lastcheckchart.receivebyposition === 56 && this.userLogin.position === 63) {
                        this.addlistpatients(this.patient);
                        //56:Coder===57:Diag
                    } else if (lastcheckchart.receivebyposition === 56 && this.userLogin.position === 57) {
                        this.addlistpatients(this.patient);
                        //57:Diag===58:Medical Record Check Chart
                    } else if (lastcheckchart.receivebyposition === 57 && this.userLogin.position === 58) {
                        this.addlistpatients(this.patient);
                        //58:Medical Record Check Chart===59:Scan
                    } else if (lastcheckchart.receivebyposition === 58 && this.userLogin.position === 59) {
                        this.addlistpatients(this.patient);
                    } else {

                        if ((lastcheckchart.sendtouser != null && lastcheckchart.sendtoposition == this.userLogin.position && lastcheckchart.sendtouser == this.userLogin.username)
                            || (lastcheckchart.sendtouser == null && lastcheckchart.sendtoposition == this.userLogin.position)
                        ) {
                            this.addlistpatients(this.patient);
                        } else {
                            this.notificationService.printErrorMessage('Chart ยังไม่ได้ส่งมาที่คุณ / Chart รับแล้ว.');
                        }
                    }

                    this.isLoading = false;

                } else {
                    //53:Ward
                    if (this.userLogin.position === 53) {
                        this.addlistpatients(this.patient);
                    } else {
                        this.notificationService.printErrorMessage('Chart ยังไม่ได้ส่งมาที่คุณ.');
                    }

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
                an: patient.an,
                receivebyuser: this.userLogin.username,
                receivebyposition: this.userLogin.position
            });

        }
    }

    savePatient() {
        this.isSaving = true;
        this.listPatients = [];

        this.checkchartService.addCheckchartMultiple(this.listpatientMultiSaveItem)
            .subscribe(() => {
                this.notificationService.printSuccessMessage('Chart รับ success.');
                this.resetForm();
                this.isSaving = false;
            }, error => {
                this.notificationService.printErrorMessage('Chart รับ error. ' + error);
                this.resetForm();
                this.isSaving = false;
            });
    }

    removePatient(an) {
        this.listPatients = this.listPatients.filter(pt => pt.an !== an);
        this.listpatientMultiSaveItem = this.listpatientMultiSaveItem.filter(pt => pt.an !== an);
    }
}