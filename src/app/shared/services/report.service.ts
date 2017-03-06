import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/Observable/throw'

import { ConfigService } from '../utils/config.service';
import { Patient } from './report';

@Injectable()
export class ReportService {

  _baseUrlCheckchart: string = '';
  _baseUrlSSBuser: string = '';

  constructor(
    private http: Http,
    private configService: ConfigService) {
    this._baseUrlSSBuser = configService.getApiURISSBuser();
    this._baseUrlCheckchart = configService.getApiURICheckchart();
  }

  getReceiveReport(position: any, fromdate: any, todate: any): Observable<any> {
    return this.http.get(this._baseUrlCheckchart + 'report/receivereport/' + position + '/' + fromdate + '/' + todate)
      .map((res: Response) => {
        return res.json();
      }).catch(this.handleError);
  }

  getPatients(an: any): Observable<Patient> {
    return this.http.get(this._baseUrlSSBuser + 'ipd/' + an)
      .map((res: Response) => {
        return res.json();
      }).catch(this.handleError);
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
