import { Component, Input } from '@angular/core';

import { Medium } from '../../models';

@Component({
  selector: 'medium',
  templateUrl: './medium.component.html',
  styleUrls: ['./medium.component.scss']
})
export class MediumComponent {
  @Input() type: Medium;
}
