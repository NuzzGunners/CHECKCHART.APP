import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Patient, Checkchart } from '../../shared/services/checkchart';

@Component({
  selector: 'app-log-chart-list',
  templateUrl: './log-chart-list.component.html',
  styleUrls: ['./log-chart-list.component.css']
})
export class LogChartListComponent implements OnInit {

  @Input() checkchartLog: Checkchart[];
  @Input() lastId: any;
  @Input() userLogin: any;
  @Output() deleteLog = new EventEmitter();
  sendtoposition: number;
  sendtopositionname: string;

  ngOnInit() {
    if (this.userLogin.position == "53") {
      this.sendtoposition = 55;
      this.sendtopositionname = "Medical Record Receive Chart";
    } else if (this.userLogin.position == "55") {
      this.sendtoposition = 56;
      this.sendtopositionname = "Coder";
    } else if (this.userLogin.position == "56") {
      this.sendtoposition = 57;
      this.sendtopositionname = "Diag";
    } else if (this.userLogin.position == "57") {
      this.sendtoposition = 58;
      this.sendtopositionname = "Medical Record Check Chart";
    } else if (this.userLogin.position == "58") {
      this.sendtoposition = 59;
      this.sendtopositionname = "Scan";
    } else if (this.userLogin.position == "59") {
      this.sendtoposition = 60;
      this.sendtopositionname = "Revenue Keep Center Check Chart";
    } else if (this.userLogin.position == "60") {
      this.sendtoposition = 61;
      this.sendtopositionname = "Revenue Keep Center";
    } else if (this.userLogin.position == "61") {
      this.sendtoposition = 62;
      this.sendtopositionname = "Shelving IPD";
    }
  }

  delete(item: any, event: any): void {
    event.preventDefault();
    this.deleteLog.emit(item);
  }

  canDelete(item): boolean {
    if ((item.sendtodatetime == null && item.id == this.lastId && item.receivebyposition == this.userLogin.positionName && item.receivebyuser == this.userLogin.username && this.userLogin.positionName != 'Shelving IPD')
      || (item.sendtodatetime != null && (this.userLogin.position != 58 || this.userLogin.position != 63) && item.id == this.lastId && item.sendtoposition == this.sendtopositionname && item.sendtobyuser == this.userLogin.username)
      || (item.sendtodatetime != null && (this.userLogin.position == 58 || this.userLogin.position == 63) && item.id == this.lastId && item.sendtobyuser == this.userLogin.username))
    return true;
  }
}