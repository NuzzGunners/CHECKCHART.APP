import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Patient, Checkchart } from '../../shared/services/checkchart';

@Component({
  selector: 'app-send-multiple-list',
  templateUrl: './send-multiple-list.component.html',
  styleUrls: ['./send-multiple-list.component.css']
})
export class SendMultipleListComponent  {

  @Input() listPatients: Patient;
  @Output() patientRemove: EventEmitter<string> = new EventEmitter();

  delete(item, event: MouseEvent) {
    this.patientRemove.emit(item.an);
    event.preventDefault();
  }

}
