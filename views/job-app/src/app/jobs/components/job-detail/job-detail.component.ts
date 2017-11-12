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
    job;

    job$: any = this._jobsService.jobDetail$.do(job => {
        if (job && job.jobName) {
            this.job = job;
            this._headerService.setHeaderText(`${this.job.jobName} - ${this.job.jobNumber}`);
        }
    });

    isJobDetailLoading$ = this._jobsService.isJobDetailLoading$;

    isJobCheckoutsLoading$ = this._jobsService.isJobCheckoutsLoading$;
    jobCheckouts$ = this._jobsService.jobCheckouts$.do(jobCheckouts => {
        this.hasCheckouts = false;

        if (jobCheckouts && jobCheckouts.length) {
            this.hasCheckouts = true;
        }
    });

    isJobLoading: boolean;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _jobsService: JobsService,
        private _headerService: HeaderService
    ) { 

    }

    private _hasCheckouts: boolean = false;

    set hasCheckouts(hasCheckouts: boolean) {
        this._hasCheckouts = hasCheckouts;
    }

    get hasCheckouts(): boolean {
        return this._hasCheckouts;
    }


    ngOnInit() {
        this.isJobLoading = true;
        const jobNumber = this._route.snapshot.paramMap.get('jobNumber');

        this._jobsService.getJobDetail(jobNumber);
        this._jobsService.getJobCheckouts(jobNumber);

        this._headerService.setHeaderText('------');
        // this._jobsService.getJob(jobNumber).subscribe(job => {
        //   this.isJobLoading = false;
        //   this._headerService.setHeaderText(`${job.companyName} - ${job.jobName}`)
        //   this.job = job;
        // });

    }



}
