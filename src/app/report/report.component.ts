import { Component } from '@angular/core';
import { ConfigService } from '../shared/utils/config.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent {

  userLogin: any;
  reporturl: SafeResourceUrl;

  constructor(
    private configService: ConfigService,
    private sanitizer: DomSanitizer
  ) {
    this.userLogin = JSON.parse(sessionStorage.getItem('userLogin'));
    this.reporturl = sanitizer.bypassSecurityTrustResourceUrl(configService.getReportURI() + '?userid=' + this.userLogin.username);
  }
}