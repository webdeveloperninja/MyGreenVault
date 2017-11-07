import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ti-job-checkouts',
  templateUrl: './job-checkouts.component.html',
  styleUrls: ['./job-checkouts.component.scss']
})
export class JobCheckoutsComponent implements OnInit {
    private _checkouts;

    @Input() checkouts;
    @Input() isCheckoutsLoading;

    ngOnInit() {
        
    }
}

