import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../../shared/services/login';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {

  @Output() login = new EventEmitter();
  user: User = new User();
  @Input() isLoading: boolean;

  constructor() { 
    this.user.username = '';
    this.user.password = '';
  }

  btnlogin() {
    if (this.user.username.trim().length > 0) {
      this.login.emit(this.user);
    }
  }
}