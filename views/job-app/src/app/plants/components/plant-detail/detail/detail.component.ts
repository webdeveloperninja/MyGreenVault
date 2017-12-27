import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { NgbModal, NgbActiveModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { PlantsService } from 'app/plants/services/plants';
import { NotificationService } from 'app/shared/services/notification/notification.service';

const MODAL_SIZE = 'lg';


@Component({
    selector: 'plant-detail',
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
    private _updatePlantModalRef: NgbModalRef;

    @Input() plantDetail: any;
    @Input() isPlantDetailLoading: boolean = false;

    @ViewChild('updatePlantRef') updatePlantRef: ElementRef;
    
    constructor(
        private _plantsService: PlantsService,
        private _modalService: NgbModal,
        private _notificationService: NotificationService,
    ) { }

    ngOnInit() {
    }

    closeUpdatePlantModal(event) {
        this._updatePlantModalRef.close();
        this._plantsService.getPlantDetail(this.plantDetail.plantNumber);
    }

    openUpdatePlantModal(jobId) {
        this._plantsService.setActiveJob(jobId);
        this._updatePlantModalRef = this._modalService.open(this.updatePlantRef, { size: MODAL_SIZE });
    }


}
