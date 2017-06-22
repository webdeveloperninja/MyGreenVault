import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter} from '@angular/core';
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

  @Output('closeUpdateModal')
  closeUpdateModal: EventEmitter<boolean> = new EventEmitter<boolean>();

  private _activeJob: any;
  get activeJob(): any {
    return this._activeJob;
  }
  @Input('activeJob')
  set activeJob(activeJob: any) {
    this._activeJob = activeJob;
  }

  constructor(
    private _fb: FormBuilder,
    private _jobsService: JobsService
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
    this._jobsService.updateJob(activeJob.value).subscribe(data => {
      console.log(data);
    });

  }

  closeModal() {
    this.closeUpdateModal.emit(true);
  }

}
