import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter, OnDestroy} from '@angular/core';
import { OperatorsService, IOperator } from '../../services/operators';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Observable, Subscription, Subject } from 'rxjs';

@Component({
  selector: 'ti-update-operator',
  templateUrl: './update-operator.component.html',
  styleUrls: ['./update-operator.component.scss']
})
export class UpdateOperatorComponent implements OnInit {

  activeOperatorFormGroup: FormGroup;

  @Input('skip') skip: number;
  @Input('take') take: number;

  @Output('closeUpdateModal')
  closeUpdateModal: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output('isLoading')
  isLoading: EventEmitter<boolean> = new EventEmitter<boolean>();

  activeOperatorSubscription$: Subscription;

  private _activeOperator: any;
  get activeOperator(): any {
    return this._activeOperator;
  }
  @Input('activeOperator')
  set activeOperator(activeOperator: any) {
    activeOperator.subscribe(activeOperator => {
      this._activeOperator = activeOperator;
    })
  }

  constructor(
    private _fb: FormBuilder,
    private _operatorsService: OperatorsService
  ) { }

  ngOnInit() {
    this.activeOperatorFormGroup = this.createGroup();
  }

  ngOnDestroy() {
    if(this.activeOperatorSubscription$)
      this.activeOperatorSubscription$.unsubscribe()
  }

  createGroup() {
    const group = this._fb.group({});

    for (var prop in this.activeOperator) {
       group.addControl(prop, this._fb.control(this.activeOperator[prop]));
    }

    return group;
  }

  updateOperator(activeOperator) {
    this.activeOperatorSubscription$ = this._operatorsService.updateOperator(activeOperator.value).subscribe(data => {
      
      this._operatorsService.getOperators().finally(() => {
     
      }).subscribe(() => {
        
      })
      this.closeModal();
    });
  }

  closeModal() {
    this.closeUpdateModal.emit(true);
  }

}
