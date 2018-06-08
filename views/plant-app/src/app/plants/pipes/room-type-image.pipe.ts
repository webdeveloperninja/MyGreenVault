import { Pipe, PipeTransform } from '@angular/core';

import { RoomType } from '../models';

@Pipe({
  name: 'roomTypeImage'
})
export class RoomTypeImagePipe implements PipeTransform {
  transform(value: any): any {
    if (value === RoomType.indoor) {
      return 'assets/images/indoor-grow.png';
    } else if (value === RoomType.outdoor) {
      return 'assets/images/outdoor-grow.png';
    }
  }
}
