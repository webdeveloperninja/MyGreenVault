import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'jobStatusNumberToTitle'
})
export class JobStatusNumberToTitlePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    switch(value) {
        case 0:
            value = 'Staging'
            break;
        case 1:
            value = 'Machining'
            break;
        case 2:
            value = 'Quality'
            break;
        case 3:
            value = 'Shipping'
            break;
        case 4:
            value = 'Complete'
            break;
        case 5:
            value = 'Waiting'
            break;
        default:
            value = value
    }
    return value;
  }

}