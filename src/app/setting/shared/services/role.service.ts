import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/Observable/throw'

import { Role } from './role';
import { ConfigService } from '../../../shared/utils/config.service';

@Injectable()
export class RoleService {

  _baseUrl: string = '';

  constructor(
    private http: Http,
    private configService: ConfigService
  ) {
    this._baseUrl = configService.getApiURICheckchart();
  }

  getRoles(): Observable<Role[]> {
    return this.http.get(this._baseUrl + 'role')
      .map((res: Response) => {
        return res.json();
      }).catch(this.handleError);
  }

  getRole(id): Observable<Role> {
    return this.http.get(this._baseUrl + 'role/' + id)
      .map((res: Response) => {
        return res.json();
      }).catch(this.handleError);
  }

  addRole(role): Observable<any> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this._baseUrl + 'role/', JSON.stringify(role), {
      headers: headers
    })
      .map((res: Response) => {
        return res.json();
      })
      .catch(this.handleError);
  }

  updateRole(role): Observable<any> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put(this._baseUrl + 'role/' + role.id, JSON.stringify(role), {
      headers: headers
    })
      .map((res: Response) => {
        return;
      })
      .catch(this.handleError);
  }

  deleteRole(id): Observable<any> {
    return this.http.delete(this._baseUrl + 'role/' + id)
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