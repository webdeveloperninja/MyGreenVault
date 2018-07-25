import { Component, Input } from '@angular/core';
import { Details } from '../../models/details';

@Component({
  selector: 'vault-details',
  templateUrl: './details.component.html'
})
export class DetailsComponent {
  @Input() details: Details;
  @Input() profileImage: string;
}
