import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PlantsService } from '../../services/plants';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HeaderService } from '../../../shared/services/header/header.service';

import { NgbModal, NgbActiveModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

const MODAL_SIZE = 'lg';

@Component({
  selector: 'ti-job-detail',
  templateUrl: './plant-detail.component.html',
  styleUrls: ['./plant-detail.component.scss']
})
export class PlantDetailComponent implements OnInit {
    job;
    @ViewChild('addExpenseRef') addExpenseRef: ElementRef;
    plant$: any = this._jobsService.plantDetail$.do(job => {
        if (job && job.jobName) {
            this.job = job;
            this._headerService.setHeaderText(`${this.job.jobName} - ${this.job.jobNumber}`);
        }
    });

    private _addJobModalRef: NgbModalRef;
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
        private _jobsService: PlantsService,
        private _modalService: NgbModal,        
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
        const plantNumber = this._route.snapshot.paramMap.get('plantNumber');

        this._jobsService.getPlantDetail(plantNumber);
        this._jobsService.getJobCheckouts(plantNumber);

        this._headerService.setHeaderText('------');
        // this._jobsService.getJob(jobNumber).subscribe(job => {
        //   this.isJobLoading = false;
        //   this._headerService.setHeaderText(`${job.companyName} - ${job.jobName}`)
        //   this.job = job;
        // });

    }

    addExpense() {
        this._addJobModalRef = this._modalService.open(this.addExpenseRef, { size: MODAL_SIZE });
    }


}
