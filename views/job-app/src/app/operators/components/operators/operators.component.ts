import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { OperatorsService, IPagedList, IOperator } from '../../services/operators';
import { SettingsService } from '../../services/settings';
import { SidebarService } from '../../services/sidebar';
import { Pipe, PipeTransform } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { NgbModal, NgbActiveModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';


const DEFAULT_TAKE: number = 8;

@Component({
  selector: 'ti-operators',
  templateUrl: './operators.component.html',
  styleUrls: ['./operators.component.scss']
})
export class OperatorsComponent implements OnInit {

  @ViewChild('updateoperatorRef') updateoperatorRef: ElementRef;
  @ViewChild('addoperatorRef') addoperatorRef: ElementRef;

  private _addOperatorModalRef: NgbModalRef;

  updateOperatorModal: any;
  private _updateOperatorModalRef: NgbModalRef;

  operators$: Observable<IOperator[]>
  isOperatorsLoading$: Observable<boolean>;

  activeOperator: IOperator = null;
  activeOperatorSub$: Subscription;

  activeOperator$: Observable<IOperator>;

  isLoading: boolean = false;

  loading: boolean = true;
  private _more: boolean;
  get more(): boolean {
    return this._more;
  }
  set more(val: boolean) {
    this._more = val;
  }

  private _skip: number = 0;
  set skip(val: number) {
    this._skip = val;
  }
  get skip(): number {
    return this._skip;
  }

  private _take: number = DEFAULT_TAKE;
  set take(val: number) {
    this._take = val;
  }
  get take(): number {
    return this._take;
  }

  constructor(
    private _operatorsService: OperatorsService,
    private _modalService: NgbModal
  ) { }

  ngOnInit() {
    this.operators$ = this._operatorsService.operators$;
    this.isOperatorsLoading$ = this._operatorsService.isOperatorsLoading$;
    this.activeOperator$ = this._operatorsService.activeOperator$;

    this.doSearch();
  }

  displayOptions = {
    companyName: {
      selected: true
    },
    contactName: {
      selected: false
    },
    contactPhoneNumber: {
      selected: true
    },
    contactEmail: {
      selected: false
    },
    operatorName: {
      selected: false
    },
    operatorNumber: {
      selected: true
    },
    operatorDescription: {
      selected: false
    },
    operatorstatus: {
      selected: true
    }
  }

  nextPage() {
    this.skip = this.skip + this.take;
    this.doSearch();
  }

  previousPage() {
    if (this.skip >= this.take) {
      this.skip = this.skip - this.take;
      this.doSearch();
    }
  }

  doSearch() {
    this.isLoading = true;

    this._operatorsService.getOperators(this.skip, this.take).subscribe(response => {
      console.log(response);
      this.more = response.more
      this.isLoading = false;
      this.more = response.more;
      this.skip = response.skip;
      this.take = response.take;
    })
  }

  openUpdateoperatorModal(operatorId) {
    this._operatorsService.setActiveOperator(operatorId);
    this._updateOperatorModalRef = this._modalService.open(this.updateoperatorRef, { size: 'lg' });
  }

  closeUpdateoperatorModal() {
    this._updateOperatorModalRef.close();
  }

  closeAddoperatorModal() {
    this._addOperatorModalRef.close();
  }

  isTiUpdateoperatorLoading(event) {
    console.log(event);
  }

  addoperator() {
    this._addOperatorModalRef = this._modalService.open(this.addoperatorRef, { size: 'lg' });
  }

}
