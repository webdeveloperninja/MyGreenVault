import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PlantsService, PagedList, Job } from '../../services/plants';
import { Pipe, PipeTransform } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { NgbModal, NgbActiveModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NotificationService, DEFAULT_NOTIFICATION_TIME } from '../../../shared/services/notification/notification.service';
import { HeaderService } from 'app/shared/services/header/header.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { alert } from 'app/shared/components/alert/alert.component';


const DEFAULT_TAKE: number = 8;
const REMOVE_JOB_SUCCESS_MESSAGE: string = 'Successfully Removed Job';
const MODAL_SIZE = 'lg';
const PAGE_TITLE: string = 'Plants';

@Component({
    selector: 'plants',
    templateUrl: './plants.component.html',
    styleUrls: ['./plants.component.scss']
})
export class PlantsComponent implements OnInit {
    public title: string = 'Remove Job';
    public message: string = 'Are you sure you want to remove job: ';
    public confirmClicked: boolean = false;
    public cancelClicked: boolean = false;

    getConfirmationMessage(operatorName: string): string {
        return `${this.message} ${operatorName}?`;
    }


    alert = alert;
    skip: number;
    take: number;

    hasJobs: boolean = false;

    query: string = '';

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

    constructor(
        private _jobsService: PlantsService,
        private _modalService: NgbModal,
        private _notificationService: NotificationService,
        private _headerService: HeaderService,
        private _route: ActivatedRoute,
        private _router: Router
    ) { }

    ngOnInit() {
        this.jobs$ = this._jobsService.jobs$.do(jobs => {
            if (jobs) {
                if (jobs.length > 0) {
                    this.hasJobs = true;
                } else {
                    this.hasJobs = false;
                }
            } else {
                this.hasJobs = false;
            }
        });

        this.isJobsLoading$ = this._jobsService.isJobsLoading$;
        this.activeJob$ = this._jobsService.activeJob$;
        this.moreJobs$ = this._jobsService.moreJobs$;
        
        let skip = this._route.snapshot.queryParams["skip"];
        let take = this._route.snapshot.queryParams["take"];
        this.query = this._route.snapshot.queryParams["query"];

        if (this.query) {
            this.query = ' - ' + this.query;
        } else {
            this.query = '';
        }

        if (skip && take) {
            this.skip = Number(skip);
            this.take = Number(take);
        } else {
            this.skip = 0;
            this.take = DEFAULT_TAKE;
        }

        this._headerService.setHeaderText(`${PAGE_TITLE} ${this.query}`);
        this.navigate();

    }

    nextPage() {
        this._jobsService.nextPage();
    }

    previousPage() {
        this._jobsService.previousPage();
    }

    navigate() {
        this._router.navigate([`/jobs`], { queryParams: { skip: this.skip, take: this.take } });
        this.doSearch();
    }

    doSearch() {
        this.isJobNotFound = false;
        this._jobsService.doSearch();
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

    addPlant() {
        this._addJobModalRef = this._modalService.open(this.addJobRef, { size: MODAL_SIZE });
    }

    stopPropogation(event) {

    }

    removeJob(job) {
        this._jobsService.removeJob(job).subscribe(() => {
            this.jobs$.first().subscribe(jobs => {
                if ((jobs.length - 1) == 0) {
                    this.previousPage();
                }
            });
            this._notificationService.setNotificationOn(REMOVE_JOB_SUCCESS_MESSAGE);
        });
    }
}
