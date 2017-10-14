import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter, OnDestroy} from '@angular/core';
import { ToolsService, Tool } from '../../services/tools';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Observable, Subscription, Subject } from 'rxjs';
import { NotificationService, DEFAULT_NOTIFICATION_TIME } from '../../../shared/services/notification/notification.service';


@Component({
  selector: 'ti-update-tool',
  templateUrl: './update-tool.component.html',
  styleUrls: ['./update-tool.component.scss']
})
export class UpdateToolComponent implements OnInit {

  activetoolFormGroup: FormGroup;

  @Input('skip') skip: number;
  @Input('take') take: number;

  @Output('closeUpdateModal')
  closeUpdateModal: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output('isLoading')
  isLoading: EventEmitter<boolean> = new EventEmitter<boolean>();

  activetoolSubscription$: Subscription;

  private _activetool: any;
  get activetool(): any {
    return this._activetool;
  }
  @Input('activeTool')
  set activetool(activetool: any) {
    activetool.subscribe(activetool => {
      this._activetool = activetool;
    })
  }

  constructor(
    private _fb: FormBuilder,
    private _toolsService: ToolsService,
    private _notificationService: NotificationService
  ) { }

  ngOnInit() {
    this.activetoolFormGroup = this.createGroup();
  }

  ngOnDestroy() {
    if(this.activetoolSubscription$)
      this.activetoolSubscription$.unsubscribe()
  }

  createGroup() {
    const group = this._fb.group({
        toolName: [this.activetool.toolName, Validators.required],
        qty: [this.activetool.qty, Validators.required],
        idealAmount: [this.activetool.idealAmount, Validators.required],
        autoOrderQty: [this.activetool.autoOrderQty, Validators.required],
        toolCost: [this.activetool.toolCost, Validators.required],
        _id: [this.activetool._id, Validators.required]
    });
    return group;
  }

  updatetool(activetool) {
    this.activetoolSubscription$ = this._toolsService.updateTool(activetool.value).first().subscribe(data => {
      
      this._toolsService.getTools(this.skip, this.take).finally(() => {
        this._notificationService.setNotificationOn(`Successfully updated ${this.activetool.toolName}`);
        Observable.timer(DEFAULT_NOTIFICATION_TIME).subscribe(() => {
          this._notificationService.setNotificationOff();
        })
        
      }).subscribe(() => {
        
      })
      this.closeModal();
    });
  }

  closeModal() {
    this.closeUpdateModal.emit(true);
  }

}
