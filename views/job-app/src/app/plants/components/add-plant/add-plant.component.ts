import { Component, OnInit, Input, ViewContainerRef, Output, EventEmitter, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl, NgForm } from '@angular/forms';
import { JobsService } from '../../services/jobs';
import { Observable } from 'rxjs';

@Component({
    selector: 'add-plant',
    templateUrl: './add-plant.component.html',
    styleUrls: ['./add-plant.component.scss']
})
export class AddPlantComponent implements OnInit {
    jobFormGroup: FormGroup;

    jobSuccessfullyAdded: boolean = false;
    isAddJobLoading: boolean = false;

    @ViewChild('jobForm') jobForm: NgForm;

    @Output('closeAddJobModal')
    closeAddJobModal: EventEmitter<boolean> = new EventEmitter<boolean>();

    @Input('skip') skip: number;
    @Input('take') take: number;

    constructor(
        private _formBuilder: FormBuilder,
        private _jobsService: JobsService
    ) { }
    
    ngOnInit() {

        this.jobFormGroup = this._formBuilder.group({
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

    addJob(jobFormGroup) {
        this.isAddJobLoading = true;
        let jobObj = {
            companyName: this.jobFormGroup.controls['companyName'].value,
            contactName: this.jobFormGroup.controls['contactName'].value,
            contactPhoneNumber: this.jobFormGroup.controls['contactPhoneNumber'].value,
            contactEmail: this.jobFormGroup.controls['contactEmail'].value,
            jobName: this.jobFormGroup.controls['jobName'].value,
            jobNumber: this.jobFormGroup.controls['jobNumber'].value,
            jobDescription: this.jobFormGroup.controls['jobDescription'].value,
            jobStatus: this.jobFormGroup.controls['jobStatus'].value
        };
        this._jobsService.addJob(jobObj).subscribe((job) => {
            this.isAddJobLoading = false;
            this._jobsService.doSearch();
        })
    }

  closeModal() {
    this.closeAddJobModal.emit(true);
  }

ngAfterViewChecked() {
  this.formChanged();
}

formChanged() {
  if (this.jobForm) {
    this.jobForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
  }
}


onValueChanged(data?: any) {
  if (!this.jobForm) { return; }
  const form = this.jobForm.form;
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
