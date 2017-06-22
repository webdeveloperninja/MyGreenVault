import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { JobsService, IPagedList, IJob } from '../../services/jobs';
import { SettingsService } from '../../services/settings';
import { SidebarService } from '../../services/sidebar';
import { Pipe, PipeTransform } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { NgbModal, NgbActiveModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';


const DEFAULT_TAKE: number = 8;

@Component({
  selector: 'ti-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit {

  @ViewChild('content') content: ElementRef;

  updateJobModal: any;
  private _updateJobModalRef: NgbModalRef;

  jobs$: Observable<IJob[]>
  isJobsLoading$: Observable<boolean>;

  activeJob: IJob = null;
  activeJobSub$: Subscription;

  isLoading: boolean = false;

  loading: boolean = true;
  private _more: boolean;
  get more(): boolean {
    return this._more;
  }
  set more(val: boolean) {
    this._more = val;
  }

  private _skip: number = 0;
  set skip(val: number) {
    this._skip = val;
  }
  get skip(): number {
    return this._skip;
  }

  private _take: number = DEFAULT_TAKE;
  set take(val: number) {
    this._take = val;
  }
  get take(): number {
    return this._take;
  }

  constructor(
      private _jobsService: JobsService,
      private _modalService: NgbModal
  ) { }

  ngOnInit() {
    this.jobs$ = this._jobsService.jobs$;
    this.isJobsLoading$ = this._jobsService.isJobsLoading$;
    this.doSearch();
  }

  nextPage() {
    this.skip = this.skip + this.take;
    this.doSearch();
  }

  previousPage() {
    if (this.skip >= this.take) {
      this.skip = this.skip - this.take;
      this.doSearch();
    } 
  }

  doSearch() {
    this.isLoading = true;

    this._jobsService.getJobs(this.skip, this.take).subscribe(jobsData => {
      this.isLoading = false;
      this.more = jobsData.more;
      this.skip = jobsData.skip;
      this.take = jobsData.take;
    })
  }

  updateJob(jobId) {
    this.activeJobSub$ = this.jobs$.flatMap(job => {
      return job
    }).filter((job, i) => {
      return job._id === jobId;
    }).subscribe((job) => {
      this.activeJob = job;
      console.log(this.activeJob);
      // open modal populate field
    });
    this._updateJobModalRef = this._modalService.open(this.content, {size: 'lg'});

  }

  closeModal() {
    this._updateJobModalRef.close();
  }
}
