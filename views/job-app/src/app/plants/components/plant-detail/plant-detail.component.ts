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
    plantDetail$: any = this._plantsService.plantDetail$.do(plant => {
        if (plant && plant.plantName) {
            this._headerService.setHeaderText(`${ plant.plantName } - ${ plant.plantNumber }`);
        }
    });

    private _addJobModalRef: NgbModalRef;
    isJobDetailLoading$ = this._plantsService.isJobDetailLoading$;

    isJobCheckoutsLoading$ = this._plantsService.isJobCheckoutsLoading$;
    
    jobCheckouts$ = this._plantsService.jobCheckouts$.do(jobCheckouts => {
        this.hasCheckouts = false;

        if (jobCheckouts && jobCheckouts.length) {
            this.hasCheckouts = true;
        }
    });

    isJobLoading: boolean;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _plantsService: PlantsService,
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

        this._plantsService.getPlantDetail(plantNumber);
        this._plantsService.getJobCheckouts(plantNumber);

        

        // this._plantsService.getPlantDetail(plantNumber).subscribe(job => {
        //   this.isJobLoading = false;
        //   this._headerService.setHeaderText(`${job.companyName} - ${job.jobName}`)
        //   this.job = job;
        // });

    }

    addExpense() {
        this._addJobModalRef = this._modalService.open(this.addExpenseRef, { size: MODAL_SIZE });
    }


}