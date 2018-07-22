import { Pipe, PipeTransform } from '@angular/core';
import { Medium } from '../models/medium';

@Pipe({
  name: 'mediumTypeLabel'
})
export class MediumTypeLabelPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if (value === Medium.soil) {
      return 'Soil';
    } else if (value === Medium.soilless) {
      return 'Soilless';
    } else if (value === Medium.water) {
      return 'Water';
    }
  }
}
