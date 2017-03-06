import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-login-form-logout',
  templateUrl: './login-form-logout.component.html',
  styleUrls: ['./login-form-logout.component.css']
})
export class LoginFormLogoutComponent {
  
  @Output() logout = new EventEmitter();

  btnlogout() {
    this.logout.emit();
  }

}
