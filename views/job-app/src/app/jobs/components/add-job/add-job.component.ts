import { Component, OnInit, Input, ViewContainerRef, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
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

    @Output('closeAddJobModal')
    closeAddJobModal: EventEmitter<boolean> = new EventEmitter<boolean>();

    @Input('skip') skip: number;
    @Input('take') take: number;

    constructor(
        private _formBuilder: FormBuilder,
        private _jobsService: JobsService
    ) { }
    
    ngOnInit() {
        this.jobFormGroup = new FormGroup({
            companyName: new FormControl(''),
            contactName: new FormControl(''),
            contactPhoneNumber:  new FormControl(''),
            contactEmail: new FormControl(''),
            jobName: new FormControl(''),
            jobNumber: new FormControl(''),
            jobDescription: new FormControl(''),
            jobStatus: new FormControl('')
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

}
