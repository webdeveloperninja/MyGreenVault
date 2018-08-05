import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { markAsTouched } from '../../../shared/utilities/forms';
import { PlantsSearchService } from '../../services/plants';
import { NgProgress } from 'ngx-progressbar';
import { RoomType } from '../../../shared/models/room-type';
import { Medium } from '../../../shared/models/medium';

@Component({
  selector: 'add-plant',
  templateUrl: './add-plant.component.html',
  styleUrls: ['./add-plant.component.scss']
})
export class AddPlantComponent implements OnInit {
  plantFormGroup: FormGroup;
  roomType = RoomType;
  medium = Medium;
  isAddPlantLoading: boolean = false;

  @ViewChild('plantForm') plantForm: NgForm;

  @Output() closeAddPlantModal = new EventEmitter();

  @Input('skip') skip: number;
  @Input('take') take: number;

  constructor(private _formBuilder: FormBuilder, private _plantsSearchService: PlantsSearchService, private _ngProgress: NgProgress) {}

  ngOnInit() {
    this.plantFormGroup = this._formBuilder.group({
      plantName: ['', Validators.required],
      plantNumber: ['', Validators.required],
      plantDescription: ['', Validators.required],
      plantStatus: ['', Validators.required],
      roomType: [this.roomType.indoor, Validators.required],
      medium: [this.roomType.indoor, Validators.required]
    });
  }

  addPlant(plantFormGroup) {
    if (this.plantFormGroup.valid) {
      this.isAddPlantLoading = true;
      this._ngProgress.start();

      const plant = {
        plantName: this.plantFormGroup.controls['plantName'].value,
        plantNumber: this.plantFormGroup.controls['plantNumber'].value,
        plantDescription: this.plantFormGroup.controls['plantDescription'].value,
        plantStatus: this.plantFormGroup.controls['plantStatus'].value,
        roomType: Number(this.plantFormGroup.controls['roomType'].value),
        medium: Number(this.plantFormGroup.controls['medium'].value)
      };

      this._plantsSearchService.addPlant(plant).subscribe(job => {
        this.isAddPlantLoading = false;
        this._ngProgress.done();
        this._plantsSearchService.doSearch();
        this._plantsSearchService.getAllPlants();
        this.closeModal();
      });
    } else {
      markAsTouched(this.plantFormGroup);
    }
  }

  closeModal() {
    this.closeAddPlantModal.emit(true);
  }

  get plantName() {
    return this.plantFormGroup.controls.plantName;
  }

  get plantNumber() {
    return this.plantFormGroup.controls.plantNumber;
  }

  get plantDescription() {
    return this.plantFormGroup.controls.plantDescription;
  }

  get plantStatus() {
    return this.plantFormGroup.controls.plantStatus;
  }

  get isIndoor() {
    return this.plantFormGroup.controls.roomType.value === RoomType.indoor;
  }

  get isOutdoor() {
    return this.plantFormGroup.controls.roomType.value === RoomType.outdoor;
  }

  get isSoil() {
    return this.plantFormGroup.controls.medium.value === Medium.soil;
  }

  get isSoilless() {
    return this.plantFormGroup.controls.medium.value === Medium.soilless;
  }
  get isWater() {
    return this.plantFormGroup.controls.medium.value === Medium.water;
  }
}
