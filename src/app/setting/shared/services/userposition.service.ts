import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams } from '@angular/http';

import { Userposition } from './userposition';
import { Position } from './position';
import { User } from './user';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/Observable/throw';

import { ConfigService } from '../../../shared/utils/config.service';

@Injectable()
export class UserpositionService {

  _baseUrlCheckchart: string = '';

  constructor(
    private http: Http,
    private configService: ConfigService
  ) {
    this._baseUrlCheckchart = configService.getApiURICheckchart();
  }

  getPositions(): Observable<Position[]>{
    return this.http.get(this._baseUrlCheckchart + 'position')
      .map((res: Response) => {
        return res.json();
      }).catch(this.handleError);
  }

  getUsers(): Observable<User[]>{
    return this.http.get(this._baseUrlCheckchart + 'user')
      .map((res: Response) => {
        return res.json();
      }).catch(this.handleError);
  }

  searchUsers(query: string): Observable<any>{
    return this.http.get(this._baseUrlCheckchart + 'user/' + query + '/search')
      .map((res: Response) => {
        return res.json();
      }).catch(this.handleError);
  }

  getUserpositions(): Observable<Userposition[]> {
    return this.http.get(this._baseUrlCheckchart + 'userposition')
      .map((res: Response) => {
        return res.json();
      }).catch(this.handleError);
  }

  getUserposition(id): Observable<Userposition> {
    return this.http.get(this._baseUrlCheckchart + 'userposition/' + id)
      .map((res: Response) => { 
        return res.json();
      }).catch(this.handleError);
  }

  addUserposition(user): Observable<Userposition> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this._baseUrlCheckchart + 'userposition/', JSON.stringify(user), {
      headers: headers
    })
      .map((res: Response) => {
        return res.json();
      })
      .catch(this.handleError);
  }

  updateUserposition(user): Observable<Userposition> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put(this._baseUrlCheckchart + 'userposition/' + user.username, JSON.stringify(user), {
      headers: headers
    })
      .map((res: Response) => {
        return res.json();
      })
      .catch(this.handleError);
  }

  deleteUserposition(id): Observable<void> {
    return this.http.delete(this._baseUrlCheckchart + 'userposition/' + id)
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
