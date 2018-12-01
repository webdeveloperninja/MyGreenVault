import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { alert } from '../../../shared/components/alert/alert.component';
import { Observable } from 'rxjs';

import { NotificationService } from '../../../shared/services/notification/notification.service';
import { PlantsSearchService } from '../../services/plants';

const DEFAULT_TAKE: number = 8;
const REMOVE_JOB_SUCCESS_MESSAGE: string = 'Successfully removed plant';
const MODAL_SIZE = 'lg';
const PAGE_TITLE: string = 'Plants';

@Component({
  selector: 'plants',
  templateUrl: './plants.component.html',
  styleUrls: ['./plants.component.scss']
})
export class PlantsComponent implements OnInit {
  public title: string = 'Remove plant';
  public message: string = 'Are you sure you want to remove plant: ';
  public confirmClicked: boolean = false;
  public cancelClicked: boolean = false;

  alert = alert;

  hasPlants: boolean = false;

  query = '';

  @ViewChild('updatePlantRef') updatePlantRef: ElementRef;
  @ViewChild('addPlantRef') addPlantRef: ElementRef;

  private _addPlantModalRef: NgbModalRef;
  private _updatePlantModalRef: NgbModalRef;

  updatePlantModal: any;
  isPlantNotFound: boolean = false;
  plants$: Observable<any[]>;
  isPlantsLoading$: Observable<boolean> = this._plantsService.isPlantsLoading$;

  activePlant$: any = this._plantsService.activePlant$;
  morePlants$: Observable<boolean> = this._plantsService.morePlants$;

  constructor(
    private _plantsService: PlantsSearchService,
    private _modalService: NgbModal,
    private _notificationService: NotificationService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {}

  ngOnInit() {
    this.plants$ = this._plantsService.plants$.do(plants => {
      if (!!plants && !!plants.length) {
        if (plants.length > 0) {
          this.hasPlants = true;
        } else {
          this.hasPlants = false;
        }
      } else {
        this.hasPlants = false;
      }
    });

    this._route.queryParams.subscribe((params: any) => {
      this.query = params.query;
    })
  }

  nextPage() {
    this._plantsService.nextPage();
  }

  previousPage() {
    this._plantsService.previousPage();
  }

  doSearch() {
    this.isPlantNotFound = false;
    this._plantsService.doSearch();
  }

  openUpdatePlantModal(jobId) {
    this._plantsService.setActivePlant(jobId);
    this._updatePlantModalRef = this._modalService.open(this.updatePlantRef, { size: 'lg' });
  }

  closeUpdatePlantModal() {
    this._updatePlantModalRef.close();
  }

  closeAddPlantModal() {
    this._addPlantModalRef.close();
  }

  addPlant() {
    this._addPlantModalRef = this._modalService.open(this.addPlantRef);
  }

  stopPropogation(event) {}

  removePlant(plant) {
    this._plantsService.removePlant(plant).subscribe(() => {
      this.plants$.first().subscribe(plants => {
        if (plants.length - 1 == 0) {
          this.previousPage();
        }
      });
      this._notificationService.setNotificationOn(REMOVE_JOB_SUCCESS_MESSAGE);
    });
  }

  getConfirmationMessage(operatorName: string): string {
    return `${this.message} ${operatorName}?`;
  }
}
