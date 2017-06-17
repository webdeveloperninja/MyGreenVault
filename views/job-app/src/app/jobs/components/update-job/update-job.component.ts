import { Component, OnInit, ViewChild, ElementRef, Input} from '@angular/core';
import { JobsService, IJob } from '../../services/jobs';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'ti-update-job',
  templateUrl: './update-job.component.html',
  styleUrls: ['./update-job.component.scss']
})
export class UpdateJobComponent implements OnInit {

  activeJobFormGroup: FormGroup;


  private _activeJob: any;
  get activeJob(): any {
    return this._activeJob;
  }
  @Input('activeJob')
  set activeJob(activeJob: any) {
    this._activeJob = activeJob;
  }

  constructor(
    private _fb: FormBuilder
  ) { }

  ngOnInit() {
    console.log(this.activeJob);
    this.activeJobFormGroup = this.createGroup();
  }

  createGroup() {
    const group = this._fb.group({});

    for (var prop in this.activeJob) {
       group.addControl(prop, this._fb.control(this.activeJob[prop]));
    }

    return group;
  }

  updateJob(activeJob) {
    console.log(activeJob.value);
    // update job 
  }

}
