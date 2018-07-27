import { Component, Input } from '@angular/core';

import { Sale } from '../../models';

@Component({
  selector: 'qty-weight-value',
  templateUrl: './qty-weight-value.component.html',
  styleUrls: ['./qty-weight-value.component.scss']
})
export class QtyWeightValueComponent {
  @Input() sale: Sale;
}
