import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {

    _apiURICheckchart: string;
    _apiURISSBuser: string;
    _reportURI: string;

    constructor() {
        /*this._apiURICheckchart = 'http://127.0.0.1:5000/api/';
        this._apiURISSBuser = 'http://127.0.0.2:5000/api/';
        this._reportURI = 'http://127.0.0.1:8088/RCC/Default.aspx';*/
        this._apiURICheckchart = 'http://10.168.23.22:5001/api/';
        this._apiURISSBuser = 'http://10.168.23.22:5002/api/';
        this._reportURI = 'http://10.168.23.22/RCC/Default.aspx';
    }

    getApiURICheckchart() {
        return this._apiURICheckchart;
    }

    getApiURISSBuser() {
        return this._apiURISSBuser;
    }

    getReportURI() {
        return this._reportURI;
    }
}