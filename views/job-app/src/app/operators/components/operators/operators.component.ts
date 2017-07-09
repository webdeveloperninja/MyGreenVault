import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { OperatorsService, PagedList, Operator } from '../../services/operators';
import { Pipe, PipeTransform } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { NgbModal, NgbActiveModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NotificationService, DEFAULT_NOTIFICATION_TIME } from '../../../shared/services/notification/notification.service';

const TITLE: string = 'Operators';
const REMOVE_TOOL_SUCCESS_MESSAGE: string = 'Successfully Removed Operator';
const MODAL_SIZE = 'lg';

@Component({
  selector: 'ti-operators',
  templateUrl: './operators.component.html',
  styleUrls: ['./operators.component.scss']
})
export class OperatorsComponent implements OnInit {
  @ViewChild('updateOperatorRef') updateOperatorRef: ElementRef;
  @ViewChild('addOperatorRef') addOperatorRef: ElementRef;

  private _addOperatorModalRef: NgbModalRef;
  private _updateOperatorModalRef: NgbModalRef;
  
  title: string = TITLE;
  updateOperatorModal: any;
  operators$: Observable<Operator[]>;
  moreOperators$: Observable<boolean>;
  operatorsSkip$: Observable<number>;
  operatorsTake$: Observable<number>;
  isOperatorsLoading$: Observable<boolean>;
  activeOperatorSub$: Subscription;
  activeOperator$: Observable<Operator>;
  isLoading$: Observable<boolean>;

  constructor(
    private _operatorsService: OperatorsService,
    private _modalService: NgbModal,
    private _notificationService: NotificationService
  ) { }

  ngOnInit() {
    this.setInitialSubscriptions();
    this.doSearch();
  }

  nextPage() {
    this._operatorsService.nextPage();
  }

  previousPage() {
    this._operatorsService.previousPage();
  }

  doSearch() {
    this._operatorsService.getOperators().subscribe(response => {});
  }

  openUpdateOperatorModal(operatorId) {
    this._operatorsService.setActiveOperator(operatorId);
    this._updateOperatorModalRef = this._modalService.open(this.updateOperatorRef, { size: MODAL_SIZE });
  }

  closeUpdateOperatorModal() {
    this._updateOperatorModalRef.close();
  }

  closeAddOperatorModal() {
    this._addOperatorModalRef.close();
  }

  addOperator() {
    this._addOperatorModalRef = this._modalService.open(this.addOperatorRef, { size: MODAL_SIZE });
  }

  removeOperator(operator) {
    this._operatorsService.removeOperator(operator).subscribe(() => {
      this._notificationService.setNotificationOn(REMOVE_TOOL_SUCCESS_MESSAGE);
    });
  }

  setInitialSubscriptions() {
    this.operators$ = this._operatorsService.operators$;
    this.activeOperator$ = this._operatorsService.activeOperator$;
    this.moreOperators$ = this._operatorsService.moreOperators$;
    this.operatorsSkip$ = this._operatorsService.operatorsSkip$;
    this.operatorsTake$ = this._operatorsService.operatorsTake$;
    this.isLoading$ = this._operatorsService.isLoading$;
  }
}
