import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  constructor() {
  }

  transform(items: any, filter: any): any {
    items.forEach(element => {
      element.filtered = false;
    });
    let result: any;
    if (filter && Array.isArray(items)) {
      const filterKeys = Object.keys(filter);
      result = items.filter(item => {
        return filterKeys.some((keyName) => {
          return new RegExp(filter[keyName], 'gi').test(item[keyName]) || filter[keyName] === '';
        });
      });
      result.forEach(element => {
        element.filtered = true;
      });
      return result;
    } else {
      result = items;
      result.forEach(element => {
        element.filtered = true;
      });
      return result;
    }
  }
}
