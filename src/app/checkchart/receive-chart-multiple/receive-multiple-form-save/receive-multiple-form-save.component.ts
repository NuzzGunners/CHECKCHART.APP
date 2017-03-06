import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MaterializeAction } from 'angular2-materialize';
import { Patient } from '../../shared/services/checkchart';

@Component({
    selector: 'app-receive-multiple-form-save',
    templateUrl: './receive-multiple-form-save.component.html',
    styleUrls: ['./receive-multiple-form-save.component.css']
})
export class ReceiveMultipleFormSaveComponent {

    modalActions = new EventEmitter<string | MaterializeAction>();
    @Input() listPatients = [];
    @Output() patientSave = new EventEmitter();

    receivePopup(event: any): void {
        event.preventDefault();
        this.modalActions.emit({ action: "modal", params: ['open'] });
    }

    save() {
       this.patientSave.emit();
       //this.listPatients = [];
    }

    closeModal() {
        this.modalActions.emit({ action: "modal", params: ['close'] });
    }

}
