import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateformat'
})
export class DateformatPipe implements PipeTransform {

  transform(value: string, args: any[]): string {
    if (value != null) {
      let d = value.substr(8, 2);
      let m = value.substr(5, 2);
      let y = value.substr(0, 4);
      let t = value.substr(11, 5);
      let result = d + '/' + m + '/' + y + ' ' + t;
      return result;
    }else{
      return '';
    }
  }
}