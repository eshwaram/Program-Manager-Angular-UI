import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filterPTask'
})
export class ParentTaskPipe implements PipeTransform {

    transform(value: any, filterString: string, propName: string): any {
        if (!value) {
            return [];
        }
        if (!filterString || filterString.trim() === '') {
            return value;
        }
        const resultArray = [];
        for (const item of value) {
            if (item[propName].toLowerCase().includes(filterString.toLowerCase())) {
                resultArray.push(item);
            }
        }
        return resultArray;
    }



}
