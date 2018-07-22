import { Component, OnInit, Input } from '@angular/core';
import { Details } from '../../models/details';

@Component({
  selector: 'vault-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  @Input() details: Details;
  constructor() {}

  ngOnInit() {}
}
