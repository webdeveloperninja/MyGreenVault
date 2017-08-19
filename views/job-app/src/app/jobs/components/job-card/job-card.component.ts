import { Component, OnInit, Input } from '@angular/core';
import { Job } from '../../services/jobs';

@Component({
  selector: 'ti-job-card',
  templateUrl: './job-card.component.html',
  styleUrls: ['./job-card.component.scss']
})
export class JobCardComponent implements OnInit {
  @Input() job: Job;
  @Input() status: string; 

  constructor() { }

  ngOnInit() {
  }

}
