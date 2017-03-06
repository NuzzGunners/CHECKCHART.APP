import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/Observable/throw'

import { ConfigService } from '../utils/config.service';
import { Login, Position, User } from './login';

@Injectable()
export class LoginService {

  _baseUrlCheckchart: string = '';

  constructor(
    private http: Http,
    private configService: ConfigService) {
    this._baseUrlCheckchart = configService.getApiURICheckchart();
  }

  getUser(username: string): Observable<any> {
    return this.http.get(this._baseUrlCheckchart + 'user/' + username)
      .map((res: Response) => {
        return res.json();
      }).catch(this.handleError);
  }

  getPosition(id): Observable<Position> {
    return this.http.get(this._baseUrlCheckchart + 'position/' + id)
      .map((res: Response) => {
        return res.json();
      }).catch(this.handleError);
  }

  getUserpositionLogin(username: string): Observable<any> {
    return this.http.get(this._baseUrlCheckchart + 'userposition/' + username + '/position')
      .map((res: Response) => {
        return res.json();
      }).catch(this.handleError);
  }

  updatePassword(updatePassword: User): Observable<User> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put(this._baseUrlCheckchart + 'user/' + updatePassword.username + '/updatepassword', JSON.stringify(updatePassword), {
      headers: headers
    })
      .map((res: Response) => {
        return res.json();
      })
      .catch(this.handleError);
  }

  private handleError(error: any) {
    var applicationError = error.headers.get('Application-Error');
    var serverError = error.json();
    var modelStateErrors: string = '';

    if (!serverError.type) {
      console.log(serverError);
      for (var key in serverError) {
        if (serverError[key])
          modelStateErrors += serverError[key] + '\n';
      }
    }

    modelStateErrors = modelStateErrors = '' ? null : modelStateErrors;

    return Observable.throw(applicationError || modelStateErrors || 'Server error');
  }
}
