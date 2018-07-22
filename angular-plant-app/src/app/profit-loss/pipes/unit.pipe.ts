import { Pipe, PipeTransform } from '@angular/core';

import { Unit } from '../models';

@Pipe({
  name: 'unit'
})
export class UnitPipe implements PipeTransform {
  transform(unit: Unit): any {
    if (Number(unit) === Unit.grams) {
      return 'grams';
    }

    if (Number(unit) === Unit.kilograms) {
      return 'kilograms';
    }

    if (Number(unit) === Unit.pounds) {
      return 'pounds';
    }
  }
}
