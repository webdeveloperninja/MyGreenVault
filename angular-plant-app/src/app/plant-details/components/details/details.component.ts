import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Details } from '../../models/details';

@Component({
  selector: 'vault-details',
  templateUrl: './details.component.html'
})
export class DetailsComponent {
  @Input() details: Details;
  @Input() profileImage: string;
  @Output() profileImageSaved = new EventEmitter();

  saveProfileImage(image) {
    this.profileImageSaved.next(image);
  }
}
