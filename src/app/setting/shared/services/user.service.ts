import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams } from '@angular/http';

import { User } from './user';
import { Role } from './role';
import { Position } from './position';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/Observable/throw';

import { ConfigService } from '../../../shared/utils/config.service';

@Injectable()
export class UserService {

  _baseUrlCheckchart: string = '';
  _baseUrlSSBuser: string = '';

  constructor(
    private http: Http,
    private configService: ConfigService
  ) {
    this._baseUrlCheckchart = configService.getApiURICheckchart();
    this._baseUrlSSBuser = configService.getApiURISSBuser();
  }

  getRoles(): Observable<Role[]>{
    return this.http.get(this._baseUrlCheckchart + 'role')
      .map((res: Response) => {
        return res.json();
      }).catch(this.handleError);
  }

  getPositions(): Observable<Position[]>{
    return this.http.get(this._baseUrlCheckchart + 'position')
      .map((res: Response) => {
        return res.json();
      }).catch(this.handleError);
  }

  searchUsers(query: string): Observable<any>{
    return this.http.get(this._baseUrlSSBuser + 'user/' + query)
      .map((res: Response) => {
        return res.json();
      }).catch(this.handleError);
  }

  getUsers(): Observable<User[]> {
    return this.http.get(this._baseUrlCheckchart + 'user')
      .map((res: Response) => {
        return res.json();
      }).catch(this.handleError);
  }

  getUser(id): Observable<User> {
    return this.http.get(this._baseUrlCheckchart + 'user/' + id)
      .map((res: Response) => { 
        return res.json();
      }).catch(this.handleError);
  }

  addUser(user): Observable<User> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this._baseUrlCheckchart + 'user/', JSON.stringify(user), {
      headers: headers
    })
      .map((res: Response) => {
        return res.json();
      })
      .catch(this.handleError);
  }

  updateUser(user): Observable<User> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put(this._baseUrlCheckchart + 'user/' + user.username, JSON.stringify(user), {
      headers: headers
    })
      .map((res: Response) => {
        return res.json();
      })
      .catch(this.handleError);
  }

  deleteUser(id): Observable<void> {
    return this.http.delete(this._baseUrlCheckchart + 'user/' + id)
      .map((res: Response) => {
        return;
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
