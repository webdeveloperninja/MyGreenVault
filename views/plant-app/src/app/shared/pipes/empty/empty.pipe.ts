import { Pipe, PipeTransform } from '@angular/core';
export const EMPTY_DEFAULT = '------';

@Pipe({
  name: 'empty'
})
export class EmptyPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value) return value;
    return EMPTY_DEFAULT;
  }

}
