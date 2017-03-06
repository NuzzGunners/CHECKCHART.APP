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

    search(event: KeyboardEvent): void {
        this.patientSearch.emit(this.txtSearchAN.trim());
        this.txtSearchAN = '';
    }
}