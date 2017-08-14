import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { JobsService, PagedList, Job } from '../../services/jobs';
import { Pipe, PipeTransform } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { NgbModal, NgbActiveModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NotificationService, DEFAULT_NOTIFICATION_TIME } from '../../../shared/services/notification/notification.service';
import { HeaderService } from '../../../shared/services/header/header.service';

const DEFAULT_TAKE: number = 8;
const REMOVE_JOB_SUCCESS_MESSAGE: string = 'Successfully Removed Job';
const MODAL_SIZE = 'lg';

@Component({
  selector: 'ti-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit {

  displayOptions = {
    companyName: true,
    contactName: true,
    jobPhone: true,
    jobEmail: true,
    jobName: true,
    jobNumber: true,
    jobDescription: true,
    jobStatus: true
  }

  @ViewChild('updateJobRef') updateJobRef: ElementRef;
  @ViewChild('addJobRef') addJobRef: ElementRef;

  private _addJobModalRef: NgbModalRef;
  private _updateJobModalRef: NgbModalRef;
  
  updateJobModal: any;
  isJobNotFound: boolean = false;
  jobs$: Observable<Job[]>
  isJobsLoading$: Observable<boolean>;
  activeJob: Job = null;
  activeJobSub$: Subscription;
  activeJob$: Observable<Job>;
  moreJobs$: Observable<boolean>;
  jobsSkip$: Observable<number>;
  jobsTake$: Observable<number>;

  constructor(
    private _jobsService: JobsService,
    private _modalService: NgbModal,
    private _notificationService: NotificationService,
    private _headerService: HeaderService
  ) { }

  ngOnInit() {
    this.jobs$ = this._jobsService.jobs$;
    this.isJobsLoading$ = this._jobsService.isJobsLoading$;
    this.activeJob$ = this._jobsService.activeJob$;
    this.moreJobs$ = this._jobsService.moreJobs$;
    this.jobsSkip$ = this._jobsService.jobsSkip$;
    this.jobsTake$ = this._jobsService.jobsTake$;
    this._headerService.setHeaderText('Jobs');
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

  openUpdateJobModal(jobId) {
    this._jobsService.setActiveJob(jobId);
    this._updateJobModalRef = this._modalService.open(this.updateJobRef, { size: MODAL_SIZE });
  }

  closeUpdateJobModal() {
    this._updateJobModalRef.close();
  }

  closeAddJobModal() {
    this._addJobModalRef.close();
  }

  addJob() {
    this._addJobModalRef = this._modalService.open(this.addJobRef, { size: MODAL_SIZE });
  }

  stopPropogation(event) {

  }

  removeJob(job) {
    this._jobsService.removeJob(job).subscribe(() => {
      this._notificationService.setNotificationOn(REMOVE_JOB_SUCCESS_MESSAGE);
    });
  }
}
