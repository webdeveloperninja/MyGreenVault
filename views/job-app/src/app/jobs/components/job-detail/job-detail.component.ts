import { Component, OnInit } from '@angular/core';
import { JobsService } from '../../services/jobs';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HeaderService } from '../../../shared/services/header/header.service';

@Component({
  selector: 'ti-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.scss']
})
export class JobDetailComponent implements OnInit {
  job: any = {
    jobName: null
  };

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _jobsService: JobsService,
    private _headerService: HeaderService
  ) { }

  ngOnInit() {
    const jobNumber = this._route.snapshot.paramMap.get('jobNumber');
    this._jobsService.getJob(jobNumber).subscribe(job => {
      this._headerService.setHeaderText(`${job.companyName} - ${job.jobName}`)
      this.job = job;
      console.log(job);
    });
  }

}
