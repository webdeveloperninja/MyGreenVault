import { Pipe, PipeTransform } from '@angular/core';

import { Medium } from '../models';

@Pipe({
  name: 'mediumTypeImage'
})
export class MediumTypeImagePipe implements PipeTransform {
  transform(value: any): any {
    if (value === Medium.soil) {
      return 'assets/images/soil.jpg';
    } else if (value === Medium.soilless) {
      return 'assets/images/soilless.jpg';
    } else if (value === Medium.water) {
      return 'assets/images/water.jpg';
    }
  }
}
