import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-send-multiple-form',
  templateUrl: './send-multiple-form.component.html',
  styleUrls: ['./send-multiple-form.component.css']
})
export class SendMultipleFormComponent {

  @Input() isSaving: boolean = false;
  @Output() patientSearch: EventEmitter<string> = new EventEmitter();
  txtSearchAN = '';

  search(event: KeyboardEvent): void {
    this.patientSearch.emit(this.txtSearchAN.trim());
    this.txtSearchAN = '';
  }

}
