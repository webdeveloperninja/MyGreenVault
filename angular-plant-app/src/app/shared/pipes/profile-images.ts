import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'profileImages' })
export class ProfileImages implements PipeTransform {
  transform(images): any {
    if (!!images && images.length > 0) {
      return images[images.length - 1];
    }
    return './assets/images/placeholder.jpg';
  }
}
