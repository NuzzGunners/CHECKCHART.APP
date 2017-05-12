import { Component, OnInit } from '@angular/core';

import { ChartService } from '../shared/services/chart.service';

import { IMyOptions, IMyDateModel } from 'mydatepicker';

@Component({
  selector: 'app-chart1',
  templateUrl: './chart1.component.html',
  styleUrls: ['./chart1.component.css']
})
export class Chart1Component implements OnInit {

  constructor(
    private chartService: ChartService
  ) {

  }

  options: Object;

  df: string = "";
  dt: string = "";

  dfFormat: string = "";
  dtFormat: string = "";

  userLogin: any;


  ngOnInit() {
    this.userLogin = JSON.parse(sessionStorage.getItem('userLogin'));
  }

  public myDatePickerOptions: IMyOptions = {
    dateFormat: 'dd mmm yyyy',
    firstDayOfWeek: 'mo',
    sunHighlight: true,
    height: '34px',
    width: '260px',
    inline: false,
    selectionTxtFontSize: '16px'

  };

  onDateFromChanged(event: IMyDateModel) {
    //console.log(event);

    if (event.formatted !== "") {
      this.df = this.toDateString(event.jsdate) + ' 00:00:00';
      this.dfFormat = event.formatted;
    } else {
      this.df = "";
      this.dfFormat = "";
    }
  }

  onDateToChanged(event: IMyDateModel) {
    //console.log(event);
    if (event.formatted !== "") {
      this.dt = this.toDateString(event.jsdate) + ' 23:59:59';
      this.dtFormat = event.formatted;
    } else {
      this.dt = "";
      this.dtFormat = "";
    }
  }

  private toDateString(date: Date): string {
    return (date.getFullYear().toString() + '-'
      + ("0" + (date.getMonth() + 1)).slice(-2) + '-'
      + ("0" + (date.getDate())).slice(-2));
  }

  onSearch() {
    //console.log(this.df, this.dt);

    this.chartService.getChart1(this.df, this.dt)
      .subscribe(r => {
        this.options =
          {
            chart: {
              type: 'column'
            },
            title: {
              text: 'TOP 10 หอผู้ป่วย รับ Chart ภายใน 1 วัน จากวันที่จำหน่าย'
            },
            subtitle: {
              text: `จากวันที่ : ${this.dfFormat} - ${this.dtFormat}`
            },
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
              pointFormat: '<b>{point.y:.0f}/{point.n:.0f}/{point.p:.1f}% Chart</b>'
            },
            credits: false,
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
          }
        //console.log(r);
      }, error => {
        console.log(error);
      })
  }

  isFormValid(): boolean {
    if (this.dt.trim().length > 0 && this.dt.trim().length > 0)
      return true;
  }
}
