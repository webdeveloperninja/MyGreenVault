import { Pipe, PipeTransform } from '@angular/core';

import { RoomType } from '../models';

@Pipe({
  name: 'roomTypeLabel'
})
export class RoomTypeLabelPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if (value === RoomType.indoor) {
      return 'Indoor';
    } else if (value === RoomType.outdoor) {
      return 'Outdoor';
    }
  }
}
