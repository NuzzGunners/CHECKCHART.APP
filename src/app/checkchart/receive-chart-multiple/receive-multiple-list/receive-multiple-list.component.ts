import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Patient, Checkchart } from '../../shared/services/checkchart';

@Component({
  selector: 'app-receive-multiple-list',
  templateUrl: './receive-multiple-list.component.html',
  styleUrls: ['./receive-multiple-list.component.css']
})
export class ReceiveMultipleListComponent {

  @Input() listPatients: Patient[];
  @Output() patientRemove: EventEmitter<string> = new EventEmitter();

  delete(item, event: MouseEvent) {
    this.patientRemove.emit(item.an);
    event.preventDefault();
  }
}
