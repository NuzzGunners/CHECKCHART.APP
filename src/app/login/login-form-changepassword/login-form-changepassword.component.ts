import { Component, Output, EventEmitter } from '@angular/core';
import { MaterializeAction } from 'angular2-materialize';
import { Password } from '../../shared/services/Password';

@Component({
  selector: 'app-login-form-changepassword',
  templateUrl: './login-form-changepassword.component.html',
  styleUrls: ['./login-form-changepassword.component.css']
})
export class LoginFormChangepasswordComponent {

  modalActions = new EventEmitter<string | MaterializeAction>();
  @Output() changedPassword = new EventEmitter();
  pwd: Password = new Password();

  constructor() {
    this.resetForm();
  }

  resetForm() {
    this.pwd.newpassword = '';
    this.pwd.newpasswordConfirm = '';
  }

  saveChangePassword() {
    this.changedPassword.emit(this.pwd);
    this.resetForm();
  }

  changePassword() {
    this.modalActions.emit({ action: "modal", params: ['open'] });
    this.resetForm();
  }

  closeModal(): void {
    this.modalActions.emit({ action: "modal", params: ['close'] });
    this.resetForm();
  }

  changePasswordValid(): boolean {
    if (!(this.pwd.newpassword.trim() === "") && !(this.pwd.newpasswordConfirm.trim() === "")) {
      return this.pwd.newpassword === this.pwd.newpasswordConfirm && this.pwd.newpassword.trim().length < 11
    }
  }
}