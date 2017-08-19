import { Component, OnInit } from '@angular/core';
import { JobsService, PagedList, Job } from '../../services/jobs';
import { Observable, Subscription } from 'rxjs';
import { HeaderService } from '../../../shared/services/header/header.service';

@Component({
  selector: 'ti-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.scss']
})
export class KanbanComponent implements OnInit {

  jobs$: Observable<Job[]>
  isJobNotFound: boolean = false;
  isJobsLoading$: Observable<boolean>;

  constructor(
     private _jobsService: JobsService,
     private _headerService: HeaderService
  ) { }

  ngOnInit() {
    this.jobs$ = this._jobsService.jobs$;
    this._headerService.setHeaderText('Kanban');
    this.isJobsLoading$ = this._jobsService.isJobsLoading$;
    
    this.doSearch();
  }

  nextPage() {
    this._jobsService.nextPage();
  }

  previousPage() {
    this._jobsService.previousPage();
  }


  doSearch() {
    this.isJobNotFound = false;
    this._jobsService.getJobs().subscribe(response => {
      if(response.data.length === 0) {
        this.isJobNotFound = true;
      }
    })
  }

}
