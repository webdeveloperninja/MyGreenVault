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

    @Output('closeAddPlantModal')
    closeAddPlantModal: EventEmitter<boolean> = new EventEmitter<boolean>();

    @Input('skip') skip: number;
    @Input('take') take: number;

    constructor(
        private _formBuilder: FormBuilder,
        private _jobsService: PlantsService
    ) { }
    
    ngOnInit() {

        this.plantFormGroup = this._formBuilder.group({
            companyName: ['', Validators.required],
            contactName: ['', Validators.required],
            contactPhoneNumber: ['', Validators.required],
            contactEmail: ['', Validators.required],
            jobName: ['', Validators.required],
            jobNumber: ['', Validators.required],
            jobDescription: ['', Validators.required],
            jobStatus: ['', Validators.required]
        });
    }

    addJob(plantFormGroup) {
        this.isAddPlantLoading = true;
        let jobObj = {
            companyName: this.plantFormGroup.controls['companyName'].value,
            contactName: this.plantFormGroup.controls['contactName'].value,
            contactPhoneNumber: this.plantFormGroup.controls['contactPhoneNumber'].value,
            contactEmail: this.plantFormGroup.controls['contactEmail'].value,
            jobName: this.plantFormGroup.controls['jobName'].value,
            jobNumber: this.plantFormGroup.controls['jobNumber'].value,
            jobDescription: this.plantFormGroup.controls['jobDescription'].value,
            jobStatus: this.plantFormGroup.controls['jobStatus'].value
        };
        this._jobsService.addJob(jobObj).subscribe((job) => {
            this.isAddPlantLoading = false;
            this._jobsService.doSearch();
        })
    }

  closeModal() {
    this.closeAddPlantModal.emit(true);
  }

ngAfterViewChecked() {
  this.formChanged();
}

formChanged() {
  if (this.plantForm) {
    this.plantForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
  }
}


onValueChanged(data?: any) {
  if (!this.plantForm) { return; }
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
  'companyName': '',
  'contactName': '',
  'contactPhoneNumber': '',
  'contactEmail': '',
  'jobNumber': '',
  'jobName': '',
  'jobDescription': ''
};

validationMessages = {
  'companyName': {
    'required':      'Company Name is required.'
  },
  'contactName': {
    'required':      'Contact Name is required.'
  },
  'contactPhoneNumber': {
    'required':      'Phone Number is required.'
  },
  'contactEmail': {
    'required':      'Contact Email is required.'
  },
  'jobNumber': {
    'required':      'Job Number is required.'
  },
  'jobName': {
    'required':      'Job Name is required.'
  },
  'jobDescription': {
    'required':      'Job Description is required.'
  },
};

}
