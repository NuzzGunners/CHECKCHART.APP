import { Component, OnInit, NgZone } from '@angular/core';
import { SignalrService } from '../shared/services/signalr.service';
import { MonitorService } from '../setting/shared/services/monitor.service';

@Component({
  selector: 'app-checkchart',
  templateUrl: './checkchart.component.html',
  styleUrls: ['./checkchart.component.css']
})
export class CheckchartComponent {

  options: Object;
  chart: any;
  userLogin: any;

  constructor(private _signalRService: SignalrService, private monitorService: MonitorService, private _ngZone: NgZone) { }

  ngOnInit() {
    this.subscribeToEvents();
    this.show();
    this.userLogin = JSON.parse(sessionStorage.getItem('userLogin'));
  }

  private toDateString(date: Date): string {
    return (("0" + (date.getDate())).slice(-2)) + '/'
      + ("0" + (date.getMonth() + 1)).slice(-2) + '/'
      + date.getFullYear().toString();
  }

  show() {
    this.monitorService.getReceivechart()
      .subscribe(r => {
        this.options = {
          chart: {
            type: 'column'
          },
          title: {
            text: 'ปริมาณการ รับ Chart ประจำวัน'
          },
          subtitle: {
            text: `วันที่: ${this.toDateString(new Date())}`
          },
          credits: false,
          xAxis: {
            type: 'category',
            labels: {
              rotation: -45,
              style: {
                fontSize: '13px',
                fontFamily: 'Verdana, sans-serif'
              }
            }
          },
          yAxis: {
            min: 0,
            title: {
              text: 'Chart (รายการ)'
            }
          },
          legend: {
            enabled: false
          },
          tooltip: {
            pointFormat: '<b>{point.y:.0f} Chart</b>'
          },
          series: [{
            name: 'Population',
            data: r,
            dataLabels: {
              enabled: true,
              rotation: -90,
              color: '#FFFFFF',
              align: 'right',
              format: '{point.y:.0f}', // one decimal
              y: 10, // 10 pixels down from the top
              style: {
                fontSize: '10px',
                fontFamily: 'Verdana, sans-serif'
              }
            }
          }]
        };
      }, error => {

      });
  }

  saveInstance(chartInstance) {
    this.chart = chartInstance;
  }

  private subscribeToEvents(): void {
    this._signalRService.connectionEstablished.subscribe((data: any) => {

      console.log('connectionEstablished : ' + data);

    });

    this._signalRService.Checkchartchanged.subscribe((data: any) => {

      console.log('checkchartchanged : ' + data);

      this.monitorService.getReceivechart()
        .subscribe(r => {
          this.chart.series[0].update({
            data: r
          });
        }, error => {
          console.log(error);
        });
    });
  }
}