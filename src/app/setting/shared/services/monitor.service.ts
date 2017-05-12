import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/Observable/throw'

import { ConfigService } from '../../../shared/utils/config.service';

@Injectable()
export class MonitorService {

  _baseUrlCheckchart: string = '';

  constructor(private http: Http, private configService: ConfigService) {
    this._baseUrlCheckchart = configService.getApiURICheckchart();
  }

  getReceivechart(): Observable<any> {
    return this.http.get(this._baseUrlCheckchart + 'chart/receivechart')
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
