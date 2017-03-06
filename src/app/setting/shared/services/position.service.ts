import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/Observable/throw'

import { Position } from './position';
import { ConfigService } from '../../../shared/utils/config.service';

@Injectable()
export class PositionService {

  _baseUrl: string = '';

  constructor(
    private http: Http,
    private configService:ConfigService
  ) {
    this._baseUrl = configService.getApiURICheckchart();
  }

  getPositions(): Observable<Position[]> {
    return this.http.get(this._baseUrl + 'position')
      .map((res: Response) => {
        return res.json();
      }).catch(this.handleError);
  }

  getPosition(id): Observable<Position> {
    return this.http.get(this._baseUrl + 'position/' + id)
      .map((res: Response) => {
        return res.json();
      }).catch(this.handleError);
  }

  addPosition(position): Observable<any> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this._baseUrl + 'position/', JSON.stringify(position), {
      headers: headers
    })
      .map((res: Response) => {
        return res.json();
      })
      .catch(this.handleError);
  }

  updatePosition(position): Observable<void> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put(this._baseUrl + 'position/' + position.id, JSON.stringify(position), {
      headers: headers
    })
      .map((res: Response) => {
        return;
      })
      .catch(this.handleError);
  }

  deletePosition(id): Observable<void> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.delete(this._baseUrl + 'position/' + id, {
      headers: headers
    })
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