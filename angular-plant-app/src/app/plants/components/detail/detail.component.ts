import { Component, ElementRef, Input, OnInit, ViewChild, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { PlantsService } from 'app/plants/services/plants';
import { NotificationService } from 'app/shared/services/notification/notification.service';

import { Plant } from '../../models';
import { PlantProfilePipe } from 'app/shared/pipes/plant-profile/plant-profile.pipe';

const MODAL_SIZE = 'lg';

@Component({
  selector: 'plant-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit, OnChanges {
  private _updatePlantModalRef: NgbModalRef;
  plantProfileImageSource: string;

  @Input() plantDetail: Plant;
  @Input() isPlantDetailLoading = false;

  @ViewChild('updatePlantRef') updatePlantRef: ElementRef;

  constructor(
    private _plantsService: PlantsService,
    private _modalService: NgbModal,
    private _notificationService: NotificationService,
    private _plantProfilePipe: PlantProfilePipe
  ) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (!!changes && !!changes.plantDetail && !!changes.plantDetail.currentValue) {
      const plantId = changes.plantDetail.currentValue._id;
      this.updatePlantProfileImage(plantId);
    }
  }

  updatePlantProfileImage(plantId: string) {
    this.plantProfileImageSource = this._plantProfilePipe.transform(plantId);
  }

  closeUpdatePlantModal(event) {
    this._updatePlantModalRef.close();
    this._plantsService.getPlantDetail(this.plantDetail.plantNumber);
  }

  openUpdatePlantModal(jobId) {
    this._plantsService.setActivePlant(jobId);
    this._updatePlantModalRef = this._modalService.open(this.updatePlantRef, { size: MODAL_SIZE });
  }

  saveProfileImage(file: File) {
    this._plantsService.saveProfileImage(this.plantDetail._id, file);
  }

  setDefaultPlantProfileImage() {
    this.plantProfileImageSource = './assets/images/placeholder.jpg';
  }
}
