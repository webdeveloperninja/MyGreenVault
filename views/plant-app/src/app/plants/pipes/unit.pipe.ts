import { Pipe, PipeTransform } from '@angular/core';

import { Unit } from '../models';

@Pipe({
  name: 'unit'
})
export class UnitPipe implements PipeTransform {
  transform(unit: Unit): any {
    if (unit === Unit.grams) {
      return 'grams';
    }

    if (unit === Unit.kilograms) {
      return 'kilograms';
    }

    if (unit === Unit.pounds) {
      return 'pounds';
    }
  }
}
