import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter, OnDestroy} from '@angular/core';
import { JobsService, IJob } from '../../services/jobs';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Observable, Subscription, Subject } from 'rxjs';

@Component({
  selector: 'ti-update-job',
  templateUrl: './update-job.component.html',
  styleUrls: ['./update-job.component.scss']
})
export class UpdateJobComponent implements OnInit {

  activeJobFormGroup: FormGroup;

  @Input('skip') skip: number;
  @Input('take') take: number;

  @Output('closeUpdateModal')
  closeUpdateModal: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output('isLoading')
  isLoading: EventEmitter<boolean> = new EventEmitter<boolean>();

  activeJobSubscription$: Subscription;

  private _activeJob: any;
  get activeJob(): any {
    return this._activeJob;
  }
  @Input('activeJob')
  set activeJob(activeJob: any) {
    activeJob.subscribe(activeJob => {
      this._activeJob = activeJob;
    })
  }

  constructor(
    private _fb: FormBuilder,
    private _jobsService: JobsService
  ) { }

  ngOnInit() {
    this.activeJobFormGroup = this.createGroup();
  }

  ngOnDestroy() {
    if(this.activeJobSubscription$)
      this.activeJobSubscription$.unsubscribe()
  }

  createGroup() {
    const group = this._fb.group({});

    for (var prop in this.activeJob) {
       group.addControl(prop, this._fb.control(this.activeJob[prop]));
    }

    return group;
  }

  updateJob(activeJob) {
    this.activeJobSubscription$ = this._jobsService.updateJob(activeJob.value).subscribe(data => {
      
      this._jobsService.getJobs().finally(() => {
     
      }).subscribe(() => {
        /*
          1) Todo Remove somehow breaks REMOVE
         */
        console.log('fuck');
      })
      this.closeModal();
    });
  }

  closeModal() {
    this.closeUpdateModal.emit(true);
  }

}
