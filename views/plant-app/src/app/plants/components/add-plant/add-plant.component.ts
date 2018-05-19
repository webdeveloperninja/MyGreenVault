import { Component, OnInit, Input, ViewContainerRef, Output, EventEmitter, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl, NgForm } from '@angular/forms';
import { PlantsService } from '../../services/plants';
import { Observable } from 'rxjs';

@Component({
  selector: 'add-plant',
  templateUrl: './add-plant.component.html',
  styleUrls: ['./add-plant.component.scss']
})
export class AddPlantComponent implements OnInit {
  plantFormGroup: FormGroup;

  plantSuccessfullyAdded: boolean = false;
  isAddPlantLoading: boolean = false;

  @ViewChild('plantForm') plantForm: NgForm;

  @Output('closeAddPlantModal') closeAddPlantModal: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input('skip') skip: number;
  @Input('take') take: number;

  constructor(private _formBuilder: FormBuilder, private _plantsService: PlantsService) {}

  ngOnInit() {
    this.plantFormGroup = this._formBuilder.group({
      plantName: ['', Validators.required],
      plantNumber: ['', Validators.required],
      plantDescription: ['', Validators.required],
      plantStatus: ['', Validators.required]
    });
  }

  addJob(plantFormGroup) {
    this.isAddPlantLoading = true;
    let jobObj = {
      plantName: this.plantFormGroup.controls['plantName'].value,
      plantNumber: this.plantFormGroup.controls['plantNumber'].value,
      plantDescription: this.plantFormGroup.controls['plantDescription'].value,
      plantStatus: this.plantFormGroup.controls['plantStatus'].value
    };
    this._plantsService.addPlant(jobObj).subscribe(job => {
      this.isAddPlantLoading = false;
      this._plantsService.doSearch();
      this._plantsService.getAllPlants();
    });
  }

  closeModal() {
    this.closeAddPlantModal.emit(true);
  }

  ngAfterViewChecked() {
    this.formChanged();
  }

  formChanged() {
    if (this.plantForm) {
      this.plantForm.valueChanges.subscribe(data => this.onValueChanged(data));
    }
  }

  onValueChanged(data?: any) {
    if (!this.plantForm) {
      return;
    }
    const form = this.plantForm.form;
    for (const field in this.formErrors) {
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  formErrors = {
    plantNumber: '',
    plantName: '',
    plantDescription: '',
    plantStatus: ''
  };

  validationMessages = {
    plantNumber: {
      required: 'Plant Number is required.'
    },
    plantName: {
      required: 'Plant Name is required.'
    },
    plantDescription: {
      required: 'Plant Description is required.'
    },
    plantStatus: {
      required: 'Plant Status is required.'
    }
  };
}
