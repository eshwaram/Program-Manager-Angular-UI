import { Pipe, PipeTransform } from '@angular/core';
import { Project } from './project.model';
@Pipe({
    name: 'filterProject'
})
export class ProjectPipe implements PipeTransform {

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
