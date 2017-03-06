import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class AuthSendService {

  userLogin: any;

  constructor(private _router: Router) { }

  canActivate(): boolean {

    if (sessionStorage.getItem('userLogin')) {
      this.userLogin = JSON.parse(sessionStorage.getItem('userLogin'));
      if ((this.userLogin.roleuserName == "Admin" || this.userLogin.roleuserName == "User") 
      && (this.userLogin.positionName != "Shelving IPD" && this.userLogin.positionName != "Coder" && this.userLogin.positionName != "Diag" && this.userLogin.positionName != "Medical Record Check Chart")) {
        return true;
      }
    }

    this._router.navigate(['login']);
    return false;
  }
}