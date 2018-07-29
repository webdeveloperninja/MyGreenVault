import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'vault-week',
  templateUrl: './week.component.html',
  styleUrls: ['./week.component.scss']
})
export class WeekComponent implements OnInit {
  @Input() week;
  constructor() {}

  ngOnInit() {}
}
