import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDateStruct, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HeaderService } from '../../../shared/services/header/header.service';
import { Observable } from 'rxjs/Observable';

import { PlantsService } from '../../services/plants';

const MODAL_SIZE = 'lg';

@Component({
  selector: 'basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.scss']
})
export class BasicInfoComponent implements OnInit {
  model: NgbDateStruct;
  date: { year: number; month: number };
  t;

  selectToday() {
    //   this.model = {year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()};
  }

  onDateChange(event) {}

  job;
  @ViewChild('addExpenseRef') addExpenseRef: ElementRef;

  plantDetail$: any = this._plantsService.plantDetail$.filter(detail => !!detail).do(plant => {
    this._headerService.setHeaderText(`${plant.plantName} - ${plant.plantNumber}`);
  });

  plantNumber$: Observable<string> = this._plantsService.plantDetail$.filter(detail => !!detail).map(detail => detail.plantNumber);

  private _addJobModalRef: NgbModalRef;
  isJobDetailLoading$ = this._plantsService.isJobDetailLoading$;

  isJobLoading: boolean;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _plantsService: PlantsService,
    private _modalService: NgbModal,
    private _headerService: HeaderService
  ) {}

  private _hasCheckouts: boolean = false;

  set hasCheckouts(hasCheckouts: boolean) {
    this._hasCheckouts = hasCheckouts;
  }

  get hasCheckouts(): boolean {
    return this._hasCheckouts;
  }

  ngOnInit() {
    this.isJobLoading = true;
    const plantId = this._route.snapshot.paramMap.get('id');

    this._plantsService.getPlantDetail(plantId);

    // this._plantsService.getPlantDetail(plantNumber).subscribe(job => {
    //   this.isJobLoading = false;
    //   this._headerService.setHeaderText(`${job.companyName} - ${job.jobName}`)
    //   this.job = job;
    // });
  }

  addExpense() {
    this._addJobModalRef = this._modalService.open(this.addExpenseRef, {
      size: MODAL_SIZE
    });
  }
}
