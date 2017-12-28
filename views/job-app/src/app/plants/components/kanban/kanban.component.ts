import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PlantsService, PagedList, Job } from '../../services/plants';
import { NgbModal, NgbActiveModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subscription } from 'rxjs';
import { HeaderService } from 'app/shared/services/header/header.service';
import { alert } from 'app/shared/components/alert/alert.component';

const MODAL_SIZE = 'lg';

@Component({
    selector: 'ti-kanban',
    templateUrl: './kanban.component.html',
    styleUrls: ['./kanban.component.scss']
})
export class KanbanComponent implements OnInit {

    hasGerminating: boolean = false;

    hasSeedling: boolean = false;
    hasVegetative: boolean = false;
    hasFlowering: boolean = false;
    hasDrying: boolean = false;
    hasDone: boolean = false;

    @ViewChild('addPlantRef') addPlantRef: ElementRef;
    private _addPlantModalRef: NgbModalRef;
    
    // get hasQuality(): boolean {
    //     return this._hasQuality;
    // }

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

    plants$ = this._jobsService.plants$.do(plants => {
        if (plants) {
            plants.forEach(plant => {
                if (plant.plantStatus === 0) {
                    this.hasGerminating = true;
                } 
                else if (plant.plantStatus === 1) {
                    this.hasSeedling = true;
                } 
                else if (plant.plantStatus === 2) {
                    this.hasVegetative = true;
                } 
                else if (plant.plantStatus === 3) {
                    this.hasFlowering = true;
                } 
                else if (plant.plantStatus === 4) {
                    this.hasDrying = true;
                } 
                else if (plant.plantStatus === 5) {
                    this.hasDone = true;
                } 
                // else if (job.jobStatus === 3) {
                //     this._hasShipping = true;
                // } else if (job.jobStatus === 4) {
                //     this._hasCompleted = true;
                // } else if (job.jobStatus === 5) {
                //     this._hasWaiting = true;
                // }
            });
        }
        
    });

    constructor(
        private _jobsService: PlantsService,
        private _headerService: HeaderService,
        private _plantsService: PlantsService,
        private _modalService: NgbModal,
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

    addPlant() {
        this._addPlantModalRef = this._modalService.open(this.addPlantRef, { size: MODAL_SIZE });
    }

}
