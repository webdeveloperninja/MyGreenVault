import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter, OnDestroy} from '@angular/core';
import { ToolsService, Itool } from '../../services/tools';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Observable, Subscription, Subject } from 'rxjs';

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
  @Input('activetool')
  set activetool(activetool: any) {
    activetool.subscribe(activetool => {
      this._activetool = activetool;
    })
  }

  constructor(
    private _fb: FormBuilder,
    private _toolsService: ToolsService
  ) { }

  ngOnInit() {
    this.activetoolFormGroup = this.createGroup();
  }

  ngOnDestroy() {
    if(this.activetoolSubscription$)
      this.activetoolSubscription$.unsubscribe()
  }

  createGroup() {
    const group = this._fb.group({});

    for (var prop in this.activetool) {
       group.addControl(prop, this._fb.control(this.activetool[prop]));
    }

    return group;
  }

  updatetool(activetool) {
    this.activetoolSubscription$ = this._toolsService.updatetool(activetool.value).subscribe(data => {
      
      this._toolsService.gettools().finally(() => {
     
      }).subscribe(() => {
        
      })
      this.closeModal();
    });
  }

  closeModal() {
    this.closeUpdateModal.emit(true);
  }

}
