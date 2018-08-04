import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'momentFormat'
})
export class MomentFormatPipe implements PipeTransform {
  transform(value: any, formatString): any {
    if (!value) {
      return;
    }
    return value.format(formatString);
  }
}
