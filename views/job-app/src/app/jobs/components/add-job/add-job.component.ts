import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { JobsService } from '../../services/jobs';


@Component({
    selector: 'add-job',
    templateUrl: './add-job.component.html',
    styleUrls: ['./add-job.component.scss']
})
export class AddJobComponent implements OnInit {
    @Input() job: any;
    constructor(
        private _formBuilder: FormBuilder,
        private _jobsService: JobsService,
    ) { }
    jobFormGroup: FormGroup;
    ngOnInit() {
        console.log(this.job);
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
        console.log(this.jobFormGroup.controls['jobStatus'].value);
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
            console.log(job);
            if(job.success) {
                this.jobFormGroup.reset();
            } else {
            }
        })
    }
}
