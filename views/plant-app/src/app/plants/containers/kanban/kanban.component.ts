import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { alert } from 'app/shared/components/alert/alert.component';
import { HeaderService } from 'app/shared/services/header/header.service';
import { Observable } from 'rxjs';

import { PlantsService } from '../../services/plants';

const MODAL_SIZE = 'lg';

@Component({
  selector: 'ti-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.scss']
})
export class KanbanComponent implements OnInit {
  allPlants$ = this._plantsService.allPlants$;

  hasGerminating: boolean = false;
  hasSeedling: boolean = false;
  hasVegetative: boolean = false;
  hasFlowering: boolean = false;
  hasDrying: boolean = false;
  hasDone: boolean = false;

  @ViewChild('addPlantRef') addPlantRef: ElementRef;
  private _addPlantModalRef: NgbModalRef;

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
  isPlantsLoading$: Observable<boolean> = this._plantsService.isPlantsLoading$.do(isLoading => {});

  plants$ = this._plantsService.allPlants$.do(plants => {
    if (plants) {
      plants.forEach(plant => {
        if (plant.plantStatus === 0) {
          this.hasGerminating = true;
        } else if (plant.plantStatus === 1) {
          this.hasSeedling = true;
        } else if (plant.plantStatus === 2) {
          this.hasVegetative = true;
        } else if (plant.plantStatus === 3) {
          this.hasFlowering = true;
        } else if (plant.plantStatus === 4) {
          this.hasDrying = true;
        } else if (plant.plantStatus === 5) {
          this.hasDone = true;
        }
      });
    }
  });

  constructor(private _plantsService: PlantsService, private _headerService: HeaderService, private _modalService: NgbModal) {}

  ngOnInit() {
    this._headerService.setHeaderText('Status');

    this.doSearch();

    this._plantsService.getAllPlants();
  }

  nextPage() {
    this._plantsService.nextPage();
  }

  previousPage() {
    this._plantsService.previousPage();
  }

  doSearch() {
    this.isJobNotFound = false;
  }

  addPlant() {
    this._addPlantModalRef = this._modalService.open(this.addPlantRef);
  }
}
