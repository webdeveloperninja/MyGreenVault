import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { OperatorsService, PagedList, Operator } from '../../services/operators';
import { Pipe, PipeTransform } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { NgbModal, NgbActiveModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NotificationService, DEFAULT_NOTIFICATION_TIME } from '../../../shared/services/notification/notification.service';
import { HeaderService } from '../../../shared/services/header/header.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

const REMOVE_TOOL_SUCCESS_MESSAGE: string = 'Successfully Removed Operator';
const MODAL_SIZE = 'lg';
const PAGE_TITLE: string = 'Operators';

@Component({
  selector: 'ti-operators',
  templateUrl: './operators.component.html',
  styleUrls: ['./operators.component.scss']
})
export class OperatorsComponent implements OnInit {
  skip: number;
  take: number;

  @ViewChild('updateOperatorRef') updateOperatorRef: ElementRef;
  @ViewChild('addOperatorRef') addOperatorRef: ElementRef;

  private _addOperatorModalRef: NgbModalRef;
  private _updateOperatorModalRef: NgbModalRef;
  
  title: string = PAGE_TITLE;
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
    private _notificationService: NotificationService,
    private _headerService: HeaderService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    this.setInitialSubscriptions();
    this._headerService.setHeaderText(PAGE_TITLE);
    let skip = this._route.snapshot.queryParams["skip"];
    let take = this._route.snapshot.queryParams["take"];
  
    if (skip && take) {
      this.skip = Number(skip);
      this.take = Number(take);
    } else {
      this.skip = 0;
      this.take = 5;
    }

    this.navigate();
    // this.doSearch();
  }

  nextPage() {
    this.skip = this.skip + this.take;
    this.navigate();
  }

  previousPage() {
    if (this.skip >= this.take) {
      this.skip = this.skip - this.take;
      this.navigate();
    }
  }

  navigate() {
    this._router.navigate([`/operators`], { queryParams: { skip: this.skip, take: this.take }});
    this.doSearch();
    console.log('navigate', this.skip)
  }

  doSearch() {
    this._operatorsService.getOperators(this.skip, this.take).subscribe(response => {});
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
      this.navigate();
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
