import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class AuthReceiveService {

  userLogin: any;

  constructor(private _router: Router) { }

  canActivate(): boolean {

    if (sessionStorage.getItem('userLogin')) {
      this.userLogin = JSON.parse(sessionStorage.getItem('userLogin'));
      if (this.userLogin.roleuserName == "Admin" || this.userLogin.roleuserName == "User") {
        return true;
      }
    }

    this._router.navigate(['login']);
    return false;
  }
}