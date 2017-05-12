import { Component, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { User } from '../../shared/services/login';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements AfterViewInit {

  @Output() login = new EventEmitter();
  user: User = new User();
  @Input() isLoading: boolean;
  public myFocusTriggeringEventEmitter = new EventEmitter<boolean>();

  constructor() {
    this.user.username = '';
    this.user.password = '';
  }

  ngAfterViewInit() {
    this.myFocusTriggeringEventEmitter.emit(true);
  }

  btnlogin() {
    if (this.user.username.trim().length > 0) {
      this.login.emit(this.user);
    }
  }
}