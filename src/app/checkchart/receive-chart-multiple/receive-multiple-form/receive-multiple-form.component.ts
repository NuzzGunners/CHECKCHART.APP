import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-receive-multiple-form',
    templateUrl: './receive-multiple-form.component.html',
    styleUrls: ['./receive-multiple-form.component.css']
})
export class ReceiveMultipleFormComponent {

    @Input() isSaving: boolean = false;
    @Output() patientSearch: EventEmitter<string> = new EventEmitter();
    txtSearchAN = '';
    @Input() listPatients = [];
    public myFocusTriggeringEventEmitter = new EventEmitter<boolean>();
    @Input() isLoading: boolean = false;
    @Output() patientRemove: EventEmitter<string> = new EventEmitter();
    @Output() patientSave = new EventEmitter();

    search(event: KeyboardEvent): void {
        this.patientSearch.emit(this.txtSearchAN.trim());
        this.txtSearchAN = '';
    }

    ngAfterViewInit() {
        this.myFocusTriggeringEventEmitter.emit(true);
    }

    savePatient() {
        this.patientSave.emit();
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
}