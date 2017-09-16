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

  // Doughnut
  public doughnutChartLabels:string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  public doughnutChartData:number[] = [350, 450, 100];
  public doughnutChartType:string = 'doughnut';
 
  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }

  ngOnInit() {
    const jobNumber = this._route.snapshot.paramMap.get('jobNumber');
    this._jobsService.getJob(jobNumber).subscribe(job => {
      this._headerService.setHeaderText(`${job.companyName} - ${job.jobName}`)
      this.job = job;
      console.log(job);
    });
  }

}
