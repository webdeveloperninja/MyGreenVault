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


  job$: any = this._jobsService.jobDetail$;
  isJobDetailLoading$ = this._jobsService.isJobDetailLoading$;

  isJobCheckoutsLoading$ = this._jobsService.isJobCheckoutsLoading$;
  jobCheckouts$ = this._jobsService.jobCheckouts$;
  
  isJobLoading: boolean;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _jobsService: JobsService,
    private _headerService: HeaderService
  ) { 
   
  }



  ngOnInit() {
    this.isJobLoading = true;
    const jobNumber = this._route.snapshot.paramMap.get('jobNumber');

    this._jobsService.getJobDetail(jobNumber);
    this._jobsService.getJobCheckouts(jobNumber);
    // this._jobsService.getJob(jobNumber).subscribe(job => {
    //   this.isJobLoading = false;
    //   this._headerService.setHeaderText(`${job.companyName} - ${job.jobName}`)
    //   this.job = job;
    // });
  }


}
