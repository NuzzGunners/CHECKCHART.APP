import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Audit, Patient } from '../../shared/services/checkchart';

@Component({
  selector: 'app-audit-chart-form-detail',
  templateUrl: './audit-chart-form-detail.component.html',
  styleUrls: ['./audit-chart-form-detail.component.css']
})
export class AuditChartFormDetailComponent {

  @Input() category: any;
  @Input() doctor: any;
  @Input() coder: any;
  @Input() ward: any;
  @Input() nurse: any;
  @Input() listPatients: Audit;
  @Input() patient: Patient;
  @Input() userLogin: any;
  @Output() auditSave = new EventEmitter();
  @Output() auditDelete = new EventEmitter();
  audit: Audit;

  constructor() {
    this.resetForm();
  }

  resetForm() {
    this.audit = new Audit();
  }

  save(event) {
    this.audit.id = this.listPatients.id;
    this.audit.an = this.listPatients.an;
    this.audit.category = this.split_text(this.listPatients.category)[0].trim();
    this.audit.doctor = this.listPatients.doctor == '' ? null : this.split_text(this.listPatients.doctor)[0].trim();
    this.audit.doctormaster = this.split_text(this.listPatients.doctormaster)[0].trim();
    this.audit.doctorconsult = this.listPatients.doctorconsult == '' ? null : this.split_text(this.listPatients.doctorconsult)[0].trim();
    this.audit.coder = this.listPatients.coder == '' ? null : this.split_text(this.listPatients.coder)[0].trim();
    this.audit.ward = this.split_text(this.listPatients.ward)[0].trim();
    this.audit.nurse = this.listPatients.nurse == '' ? null : this.split_text(this.listPatients.nurse)[0].trim();
    this.audit.rwbefore = this.listPatients.rwbefore;
    this.audit.rwafter = this.listPatients.rwafter;
    this.audit.los = this.listPatients.los;
    this.audit.entrybyuser = this.userLogin.username;
    this.auditSave.emit(this.audit);
    
    this.resetForm();
  }

  delete(event) {
    this.audit.id = this.listPatients.id;
    this.audit.fullname = this.listPatients.fullname;
    this.audit.entrybyuser = this.userLogin.username;
    this.auditDelete.emit(this.audit);
    this.resetForm();
  }

  formValid(): boolean {
    if (
      (this.listPatients.an) &&
      (this.listPatients.rwbefore >= 0) &&
      (this.listPatients.rwafter >= 0) &&
      (this.split_text(this.listPatients.ward).length === 2) &&
      (this.listPatients.los >= 0) &&
      (this.split_text(this.listPatients.doctormaster).length === 2) &&
      (this.split_text(this.listPatients.category).length === 2) &&
      (this.listPatients.doctorconsult.trim().length > 0 && this.split_text(this.listPatients.doctorconsult).length === 2 
      || this.listPatients.doctorconsult.trim().length === 0) &&
      (this.listPatients.doctor.trim().length > 0 || this.listPatients.nurse.trim().length > 0) &&
      (this.listPatients.doctor.trim().length > 0 && this.split_text(this.listPatients.doctor).length === 2 
      || this.listPatients.doctor.trim().length === 0) &&
      (this.listPatients.nurse.trim().length > 0 && this.split_text(this.listPatients.nurse).length === 2 
      || this.listPatients.nurse.trim().length === 0)
    ) {
      return true;
    }
  }

  split_text(data: string): string[] {
    let result = data == '' ? ''.split(":") : data.split(":");
    return result;
  }

  clearddldoctor() {
    this.listPatients.doctor = '';
  }

  clearddldoctormaster() {
    this.listPatients.doctormaster = '';
  }

  clearddldoctorconsult() {
    this.listPatients.doctorconsult = '';
  }

  clearddlward() {
    this.listPatients.ward = '';
  }

  clearddlnurse() {
    this.listPatients.nurse = '';
  }

  clearddlcategory() {
    this.listPatients.category = '';
  }

  clearddlcoder() {
    this.listPatients.coder = '';
  }
}