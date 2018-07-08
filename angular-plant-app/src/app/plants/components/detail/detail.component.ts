import { Component, ElementRef, Input, OnInit, ViewChild, OnChanges, SimpleChanges, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { PlantsService } from 'app/plants/services/plants';
import { NotificationService } from 'app/shared/services/notification/notification.service';

import { Plant } from '../../models';
import { PlantProfilePipe } from 'app/shared/pipes/plant-profile/plant-profile.pipe';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

const MODAL_SIZE = 'lg';

@Component({
  selector: 'plant-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit, OnChanges, OnDestroy {
  private _updatePlantModalRef: NgbModalRef;
  plantProfileImageSource: string;
  showProfileImage = true;
  @Input() plantDetail: Plant;
  @Input() isPlantDetailLoading = false;

  @ViewChild('updatePlantRef') updatePlantRef: ElementRef;

  constructor(
    private _plantsService: PlantsService,
    private _modalService: NgbModal,
    private _notificationService: NotificationService,
    private _plantProfilePipe: PlantProfilePipe,
    private _changeDectorRef: ChangeDetectorRef
  ) {}

  ngOnInit() {}

  ngOnDestroy() {
    this.plantProfileImageSource = '';
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!!changes && !!changes.plantDetail && !!changes.plantDetail.currentValue) {
      const plantId = changes.plantDetail.currentValue._id;
      this.updatePlantProfileImage(plantId);
    }
  }

  updatePlantProfileImage(plantId: string) {
    const cacheBuster = new Date().getTime();
    this.plantProfileImageSource = '';
    setTimeout(() => this._changeDectorRef.detectChanges());
    this.plantProfileImageSource = `${this._plantProfilePipe.transform(plantId)}?${cacheBuster}`;
    console.log(this.plantProfileImageSource);
    setTimeout(() => this._changeDectorRef.detectChanges());
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
    console.log('save');
    this._plantsService
      .saveProfileImage(this.plantDetail._id, file)
      .pipe(
        finalize(() => {
          console.log('finalizs');
          this.updatePlantProfileImage(this.plantDetail._id);
        })
      )
      .subscribe(res => {
        console.log('update');
        this.updatePlantProfileImage(this.plantDetail._id);
      });
  }

  setDefaultPlantProfileImage() {
    this.plantProfileImageSource = './assets/images/placeholder.jpg';
  }
}
