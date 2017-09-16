import { Component, OnInit } from '@angular/core';
import { JobsService } from '../../services/jobs';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'ti-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.scss']
})
export class JobDetailComponent implements OnInit {

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _jobsService: JobsService
  ) { }

  ngOnInit() {
    const jobNumber = this._route.snapshot.paramMap.get('jobNumber');
    this._jobsService.getJob(jobNumber).subscribe(data => {
    });
  }

}
