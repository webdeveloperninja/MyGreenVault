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
  noImage = false;
  imageLoading = false;
  private _updatePlantModalRef: NgbModalRef;
  plantProfileImageSource: string;
  showProfileImage = true;
  @Input() plantDetail: Plant;
  @Input() isPlantDetailLoading = false;
  @ViewChild('heroImage') image: ElementRef;

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
      this.getPlantProfileImage();
      this.updatePlantProfileImage(plantId);
    }
  }

  getPlantProfileImage() {
    this.imageLoading = true;
    this._plantsService
      .getPlantProfileImage(this.plantDetail._id)
      .pipe(
        catchError(err => {
          this.noImage = true;
          return of(err);
        })
      )
      .subscribe(plantPhoto => {
        if (!!plantPhoto.error) {
          return;
        }
        this.imageLoading = false;
        this.noImage = false;
        console.log('yay', plantPhoto);
        this.image.nativeElement.src = URL.createObjectURL(plantPhoto);
      });
  }

  updatePlantProfileImage(plantId: string) {
    this.imageLoading = true;
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

  imageDeleted() {
    this.noImage = true;
  }

  saveProfileImage(file: File) {
    console.log('save');
    this._plantsService
      .saveProfileImage(this.plantDetail._id, file)
      .pipe(
        finalize(() => {
          console.log('finalizs');
          this.getPlantProfileImage();
        })
      )
      .subscribe(res => {
        console.log('update');
        this.updatePlantProfileImage(this.plantDetail._id);
      });
  }
}
