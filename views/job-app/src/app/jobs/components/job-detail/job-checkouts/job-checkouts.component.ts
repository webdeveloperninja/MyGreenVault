import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ti-job-checkouts',
  templateUrl: './job-checkouts.component.html',
  styleUrls: ['./job-checkouts.component.scss']
})
export class JobCheckoutsComponent implements OnInit {

  @Input() checkouts;

  constructor() { }

  ngOnInit() {
  }

  isCheckoutEmptyAndNotLoading() {
    if (this.checkouts && this.checkouts.length) {
      return false;
    }
    return true;
  }

}

