import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'jobStatusNumberToTitle'
})
export class JobStatusNumberToTitlePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    switch(value) {
        case 0:
            value = 'Germinating'
            break;
        case 1:
            value = 'Seedling'
            break;
        case 2:
            value = 'Vegetative'
            break;
        case 3:
            value = 'Flowering'
            break;
        case 4:
            value = 'Drying/Curing'
            break;
        case 5:
            value = 'Done'
            break;
        default:
            value = value
    }
    return value;
  }

}