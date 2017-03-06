import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MaterializeAction } from 'angular2-materialize';

@Component({
  selector: 'app-login-form-position',
  templateUrl: './login-form-position.component.html',
  styleUrls: ['./login-form-position.component.css']
})
export class LoginFormPositionComponent {

  @Output() position = new EventEmitter();
  @Output() changedposition = new EventEmitter();
  @Input() selectPositionOptions: any;

  btnposition() {
    this.position.emit();
  }

  changePosition(event){
    this.changedposition.emit(event.target.value);
  }

}
