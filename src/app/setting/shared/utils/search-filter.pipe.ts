import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter',
  pure: false
})
export class SearchFilterPipe implements PipeTransform {

  transform(items: any, conditions: { [field: string]: any }): any {
    for (let field in conditions) {
      if (conditions[field]) {
        return items.filter(item => item[field].toLowerCase().indexOf(conditions[field].toLowerCase()) !== -1);
      }else{
        return items;
      }
    }
  }
}