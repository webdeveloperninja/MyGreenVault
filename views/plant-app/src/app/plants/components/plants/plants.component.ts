import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PlantsService } from '../../services/plants';
import { Pipe, PipeTransform } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { NgbModal, NgbActiveModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NotificationService, DEFAULT_NOTIFICATION_TIME } from '../../../shared/services/notification/notification.service';
import { HeaderService } from 'app/shared/services/header/header.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { alert } from 'app/shared/components/alert/alert.component';
import { Plant } from '../../models';

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

  query: string = '';

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
    private _plantsService: PlantsService,
    private _modalService: NgbModal,
    private _notificationService: NotificationService,
    private _headerService: HeaderService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {}

  ngOnInit() {
    this.plants$ = this._plantsService.plants$.do(plants => {
      if (plants) {
        if (plants.length > 0) {
          this.hasPlants = true;
        } else {
          this.hasPlants = false;
        }
      } else {
        this.hasPlants = false;
      }
    });

    this._headerService.setHeaderText(`${PAGE_TITLE} ${this.query}`);
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
    this._updatePlantModalRef = this._modalService.open(this.updatePlantRef, {
      size: MODAL_SIZE
    });
  }

  closeUpdatePlantModal() {
    this._updatePlantModalRef.close();
  }

  closeAddJobModal() {
    this._addPlantModalRef.close();
  }

  addPlant() {
    this._addPlantModalRef = this._modalService.open(this.addPlantRef, {
      size: MODAL_SIZE
    });
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
