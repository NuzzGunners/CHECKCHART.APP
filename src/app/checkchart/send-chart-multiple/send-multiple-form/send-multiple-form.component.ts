import { Component, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-send-multiple-form',
  templateUrl: './send-multiple-form.component.html',
  styleUrls: ['./send-multiple-form.component.css']
})
export class SendMultipleFormComponent implements AfterViewInit {

  @Input() isSaving: boolean = false;
  @Output() patientSearch: EventEmitter<string> = new EventEmitter();
  txtSearchAN = '';
  @Input() isLoading: boolean = false;
  @Input() listPatients = [];
  @Input() sendtouser: any;
  @Input() position: number;
  @Output() patientRemove: EventEmitter<string> = new EventEmitter();
  @Output() patientSave = new EventEmitter();
  public myFocusTriggeringEventEmitter = new EventEmitter<boolean>();
  @Output() ddlsendtouser: EventEmitter<string> = new EventEmitter();
  @Output() changePositionToSend: EventEmitter<string> = new EventEmitter();

  ngAfterViewInit() {
    this.myFocusTriggeringEventEmitter.emit(true);
  }

  search(event: KeyboardEvent): void {
    this.patientSearch.emit(this.txtSearchAN.trim());
    this.txtSearchAN = '';
  }

  savePatient() {
    this.patientSave.emit();
    this.listPatients = [];
    this.myFocusTriggeringEventEmitter.emit(true);
  }

  cancelSavePatient() {
    this.myFocusTriggeringEventEmitter.emit(true);
  }

  removePatient(an) {
    this.patientRemove.emit(an);
    this.myFocusTriggeringEventEmitter.emit(true);
    event.preventDefault();
  }

  ddlsendtouserSelect(user) {
    this.ddlsendtouser.emit(user);
  }

  positionToSendChanged(position) {
    this.changePositionToSend.emit(position);
  }
}