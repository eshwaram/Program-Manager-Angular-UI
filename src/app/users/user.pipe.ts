import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterUser'
})
export class UserPipe implements PipeTransform {

  transform(value: any, filterString: string, propName1: string, propName2: string): any {
    if (!value) {
      return [];
    }
    if (!filterString || filterString.trim() === '') {
      return value;
    }
    const resultArray = [];
    for (const item of value) {
      if (item[propName1].toLowerCase().includes(filterString.toLowerCase()) ||
        item[propName2].toLowerCase().includes(filterString.toLowerCase())) {
        resultArray.push(item);
      }
    }
    return resultArray;
  }



}
