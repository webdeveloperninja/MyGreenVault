import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ti-job-contact',
  templateUrl: './job-contact.component.html',
  styleUrls: ['./job-contact.component.scss']
})
export class JobContactComponent implements OnInit {

  @Input() name: string;
  @Input() email: string;
  @Input() phone: string;

  constructor() { }

  ngOnInit() {
  }

}
