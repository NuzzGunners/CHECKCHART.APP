import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MaterializeAction } from 'angular2-materialize';
import { Patient } from '../../shared/services/checkchart';

@Component({
  selector: 'app-send-multiple-form-save',
  templateUrl: './send-multiple-form-save.component.html',
  styleUrls: ['./send-multiple-form-save.component.css']
})
export class SendMultipleFormSaveComponent {

  modalActions = new EventEmitter<string | MaterializeAction>();
  @Input() listPatients = [];
  @Output() patientSave = new EventEmitter();
  @Input() sendtouser: any;
  @Input() position: number;
  @Output() ddlsendtouser: EventEmitter<string> = new EventEmitter();
  @Output() changePositionToSend: EventEmitter<string> = new EventEmitter();
  PositionToSend = '';

  ddlsendtouserSelect(user) {
    this.ddlsendtouser.emit(user);
  }

  positionToSendChanged(event) {
    this.changePositionToSend.emit(event);
    this.PositionToSend = event;
  }

  sendPopup(event: any): void {
    event.preventDefault();
    this.modalActions.emit({ action: "modal", params: ['open'] });
  }

  save() {
    this.patientSave.emit();
    this.listPatients = [];
  }

  closeModal() {
    this.modalActions.emit({ action: "modal", params: ['close'] });
  }
}