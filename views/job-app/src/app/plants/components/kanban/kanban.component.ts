import { Component, OnInit } from '@angular/core';
import { PlantsService, PagedList, Job } from '../../services/plants';
import { Observable, Subscription } from 'rxjs';
import { HeaderService } from 'app/shared/services/header/header.service';
import { alert } from 'app/shared/components/alert/alert.component';

@Component({
    selector: 'ti-kanban',
    templateUrl: './kanban.component.html',
    styleUrls: ['./kanban.component.scss']
})
export class KanbanComponent implements OnInit {

    private _hasStaging: boolean;;

    get hasStaging(): boolean {
        return this._hasStaging;
    }

    set hasStaging(value: boolean) {
        this._hasStaging = value;
    }

    private _hasMachining: boolean = false;

    get hasMachining(): boolean {
        return this._hasMachining;
    }

    private _hasQuality: boolean = false;

    get hasQuality(): boolean {
        return this._hasQuality;
    }

    private _hasShipping: boolean = false;

    get hasShipping(): boolean {
        return this._hasShipping;
    }

    private _hasCompleted: boolean = false;

    get hasCompleted(): boolean {
        return this._hasCompleted;
    }

    private _hasWaiting: boolean = false;
    
    get hasWaiting(): boolean {
        return this._hasWaiting;
    }

    alert = alert;

    isJobNotFound: boolean = false;
    isPlantsLoading$: Observable<boolean> = this._jobsService.isPlantsLoading$.do(isLoading => {
        console.log('loading');
        console.log(isLoading);
    });

    plants$ = this._jobsService.plants$.do(jobs => {
        if (jobs) {
            jobs.forEach(job => {
                if (job.jobStatus === 0) {
                    this.hasStaging = true;
                } else if (job.jobStatus === 1) {
                    this._hasMachining = true;
                } else if (job.jobStatus === 2) {
                    this._hasQuality = true;
                } else if (job.jobStatus === 3) {
                    this._hasShipping = true;
                } else if (job.jobStatus === 4) {
                    this._hasCompleted = true;
                } else if (job.jobStatus === 5) {
                    this._hasWaiting = true;
                }
            });
        }
        
    });

    constructor(
        private _jobsService: PlantsService,
        private _headerService: HeaderService
    ) { }

    ngOnInit() {
        this._headerService.setHeaderText('Status');

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
    }

}
