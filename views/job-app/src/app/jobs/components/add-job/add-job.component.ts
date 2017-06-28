import { Component, OnInit, Input, ViewContainerRef, Output, EventEmitter, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl, NgForm } from '@angular/forms';
import { JobsService } from '../../services/jobs';
import { Observable } from 'rxjs';

@Component({
    selector: 'add-job',
    templateUrl: './add-job.component.html',
    styleUrls: ['./add-job.component.scss']
})
export class AddJobComponent implements OnInit {
    jobFormGroup: FormGroup;

    jobSuccessfullyAdded: boolean = false;

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
            if(job.success) {
                this.jobFormGroup.reset();
                this.jobSuccessfullyAdded = true;
                this._jobsService.getJobs(this.skip, this.take).subscribe();
                Observable.timer(5000).subscribe(() => {
                    this.jobSuccessfullyAdded = false;
                })
            } else {
            }
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
    // clear previous error message (if any)
    this.formErrors[field] = '';
    const control = form.get(field);

    if (control && control.dirty && !control.valid) {
      const messages = this.validationMessages[field];
      for (const key in control.errors) {
        this.formErrors[field] += messages[key] + ' ';
      }
    }
  }
  console.log(this.formErrors);
}

formErrors = {
  'companyName': ''
};

validationMessages = {
  'companyName': {
    'required':      'Name is required.'
  }
};

}
