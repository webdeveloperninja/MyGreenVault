import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter, OnDestroy} from '@angular/core';
import { PlantsService, Job } from '../../services/plants';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Observable, Subscription, Subject } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'update-plant',
  templateUrl: './update-plant.component.html',
  styleUrls: ['./update-plant.component.scss']
})
export class UpdatePlantComponent implements OnInit {

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
    private _jobsService: PlantsService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    this.activeJobFormGroup = this.createGroup();

    let skip = this._route.snapshot.queryParams["skip"];
    let take = this._route.snapshot.queryParams["take"];


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
        this._jobsService.doSearch();

      this.closeModal();
    });
  }

  closeModal() {
    this.closeUpdateModal.emit(true);
  }

}
