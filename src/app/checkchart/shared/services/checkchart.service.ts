import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/Observable/throw'

import { ConfigService } from '../../../shared/utils/config.service';
import { Patient, Checkchart, deleteCheckchartLog, Doctor, Audit } from '../services/checkchart';

@Injectable()
export class CheckchartService {

  _baseUrlCheckchart: string = '';
  _baseUrlSSBuser: string = '';

  constructor(private http: Http, private configService: ConfigService) {
    this._baseUrlSSBuser = configService.getApiURISSBuser();
    this._baseUrlCheckchart = configService.getApiURICheckchart();
  }

  addAuditchart(audit: Audit): Observable<any> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this._baseUrlCheckchart + 'audit/', JSON.stringify(audit), {
      headers: headers
    })
      .map((res: Response) => {
        return res.json();
      })
      .catch(this.handleError);
  }

  updateAuditchart(audit: Audit): Observable<any> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put(this._baseUrlCheckchart + 'audit/' + audit.id, JSON.stringify(audit), {
      headers: headers
    })
      .map((res: Response) => {
        return;
      })
      .catch(this.handleError);
  }

  deleteAuditchart(audit: Audit): Observable<any> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put(this._baseUrlCheckchart + 'audit/' + audit.id + '/deleteaudit', JSON.stringify(audit), {
      headers: headers
    })
      .map((res: Response) => {
        return;
      })
      .catch(this.handleError);
  }

  getAuditchart(an: any): Observable<any> {
    return this.http.get(this._baseUrlCheckchart + 'viewaudit/' + an)
      .map((res: Response) => {
        return res.json();
      }).catch(this.handleError);
  }

  getPatientCheckchartLog(an: string): Observable<Checkchart[]> {
    return this.http.get(this._baseUrlCheckchart + 'checkchartlog/' + an)
      .map((res: Response) => {
        return res.json();
      }).catch(this.handleError);
  }

  getSendToUsers(position: string): Observable<void> {
    return this.http.get(this._baseUrlCheckchart + 'userposition/' + position + '/sendtouser')
      .map((res: Response) => {
        return res.json();
      }).catch(this.handleError);
  }

  getCategories(): Observable<void> {
    return this.http.get(this._baseUrlCheckchart + 'auditcategory/')
      .map((res: Response) => {
        return res.json();
      }).catch(this.handleError);
  }

  getCategorie(category): Observable<void> {
    return this.http.get(this._baseUrlCheckchart + 'auditcategory/' + category)
      .map((res: Response) => {
        return res.json();
      }).catch(this.handleError);
  }

  getPatient(an: string): Observable<Patient[]> {
    return this.http.get(this._baseUrlSSBuser + 'ipd/' + an)
      .map((res: Response) => {
        return res.json();
      }).catch(this.handleError);
  }

  getPatientCheckchart(an: string): Observable<Checkchart> {
    return this.http.get(this._baseUrlCheckchart + 'checkchart/' + an)
      .map((res: Response) => {
        return res.json();
      }).catch(this.handleError);
  }

  getLastPatientCheckchart(an: string): Observable<Checkchart> {
    return this.http.get(this._baseUrlCheckchart + 'checkchart/' + an + '/last')
      .map((res: Response) => {
        return res.json();
      }).catch(this.handleError);
  }

  getPatientCheckchartByReceive(an: string, receivebyposition: number): Observable<Checkchart> {
    return this.http.get(this._baseUrlCheckchart + 'checkchart/' + an + '/position/' + receivebyposition)
      .map((res: Response) => {
        return res.json();
      }).catch(this.handleError);
  }

  addCheckchart(checkchart: any): Observable<any> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this._baseUrlCheckchart + 'checkchart/', JSON.stringify(checkchart), {
      headers: headers
    })
      .map((res: Response) => {
        return res.json();
      })
      .catch(this.handleError);
  }

  addCheckchartMultiple(item): Observable<any> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this._baseUrlCheckchart + 'checkchart/addmultiple/', JSON.stringify(item), {
      headers: headers
    })
      .map((res: Response) => {
        return;
      })
      .catch(this.handleError);
  }

  updateCheckchart(checkchart): Observable<void> {
    //console.log(checkchart);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put(this._baseUrlCheckchart + 'checkchart/' + checkchart.id, JSON.stringify(checkchart), {
      headers: headers
    })
      .map((res: Response) => {
        return;
      })
      .catch(this.handleError);
  }

  updateCheckchartMultiple(item): Observable<any> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put(this._baseUrlCheckchart + 'checkchart/updatemultiple/', JSON.stringify(item), {
      headers: headers
    })
      .map((res: Response) => {
        return;
      })
      .catch(this.handleError);
  }

  getReasons(): Observable<void> {
    return this.http.get(this._baseUrlCheckchart + 'reason')
      .map((res: Response) => {
        return res.json();
      }).catch(this.handleError);
  }

  deletePatientLog(log: deleteCheckchartLog): Observable<void> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put(this._baseUrlCheckchart + 'checkchart/' + log.id + '/deletecheckchart', JSON.stringify(log), {
      headers: headers
    })
      .map((res: Response) => {
        return;
      })
      .catch(this.handleError);
  }

  searchDoctor(query: string): Observable<Doctor[]> {

    return this.http.get(this._baseUrlSSBuser + 'doctor/' + query)
      .map((res: Response) => {
        return res.json();
      }).catch(this.handleError);

  }

  getDoctors(): Observable<any> {

    return this.http.get(this._baseUrlSSBuser + 'doctor/')
      .map((res: Response) => {
        return res.json();
      }).catch(this.handleError);

  }

  getDoctor(doctor): Observable<any> {
    return this.http.get(this._baseUrlSSBuser + 'doctor/' + doctor)
      .map((res: Response) => {
        return res.json();
      }).catch(this.handleError);
  }

  getWards(): Observable<any> {

    return this.http.get(this._baseUrlSSBuser + 'ward/')
      .map((res: Response) => {
        return res.json();
      }).catch(this.handleError);

  }

  getWard(ward): Observable<any> {

    return this.http.get(this._baseUrlSSBuser + 'ward/' + ward)
      .map((res: Response) => {
        return res.json();
      }).catch(this.handleError);

  }

  getNurses(): Observable<any> {

    return this.http.get(this._baseUrlSSBuser + 'nurse/')
      .map((res: Response) => {
        return res.json();
      }).catch(this.handleError);

  }

  getNurse(nurse): Observable<any> {

    return this.http.get(this._baseUrlSSBuser + 'nurse/' + nurse)
      .map((res: Response) => {
        return res.json();
      }).catch(this.handleError);

  }

  getCoders(): Observable<any> {

    return this.http.get(this._baseUrlCheckchart + 'userposition/coders')
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
