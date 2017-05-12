import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class AuthSendService {

  userLogin: any;

  constructor(private _router: Router) { }

  canActivate(): boolean {

    //56 Coder
    //57 Diag
    //58 Medical Record Check Chart
    //62 Shelving IPD

    if (sessionStorage.getItem('userLogin')) {
      this.userLogin = JSON.parse(sessionStorage.getItem('userLogin'));
      if ((this.userLogin.roleuserName === "Admin" || this.userLogin.roleuserName === "User") 
      && (this.userLogin.position !== 56 && this.userLogin.position !== 57 && this.userLogin.position !== 58 && this.userLogin.position !== 62)) {
        return true;
      }
    }

    this._router.navigate(['login']);
    return false;
  }
}