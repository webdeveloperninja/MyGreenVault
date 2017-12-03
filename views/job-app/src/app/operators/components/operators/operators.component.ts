import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { OperatorsService, PagedList, Operator } from '../../services/operators';
import { Pipe, PipeTransform } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { NgbModal, NgbActiveModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NotificationService, DEFAULT_NOTIFICATION_TIME } from 'app/shared/services/notification/notification.service';
import { HeaderService } from 'app/shared/services/header/header.service';
import { alert } from 'app/shared/components/alert/alert.component';

import { Router, ActivatedRoute, Params } from '@angular/router';

const REMOVE_TOOL_SUCCESS_MESSAGE: string = 'Successfully Removed Operator';
const MODAL_SIZE = 'lg';
const PAGE_TITLE: string = 'Tenders';

@Component({
  selector: 'ti-operators',
  templateUrl: './operators.component.html',
  styleUrls: ['./operators.component.scss']
})
export class OperatorsComponent implements OnInit {

    public title: string = 'Remove Tender';
    public message: string = 'Are you sure you want to remove tender: ';
    public confirmClicked: boolean = false;
    public cancelClicked: boolean = false;

    getConfirmationMessage(operatorName: string): string {
        return `${this.message} ${operatorName}?`;
    }

    hasOperators: boolean = false;

    alert = alert;
    skip: number;
    take: number;

    @ViewChild('updateOperatorRef') updateOperatorRef: ElementRef;
    @ViewChild('addOperatorRef') addOperatorRef: ElementRef;

    private _addOperatorModalRef: NgbModalRef;
    private _updateOperatorModalRef: NgbModalRef;

    updateOperatorModal: any;

    operators$: Observable<Operator[]> = this._operatorsService.operators$.do(operators => {
        if (operators) {
            if (operators.length > 0) {
                this.hasOperators = true;
            } else {
                this.hasOperators = false;
            }
        } else {
            this.hasOperators = false;
        }
    });

    isOperatorsLoading$: Observable<boolean> = this._operatorsService.isOperatorsLoading$;
    moreOperators$: Observable<boolean> = this._operatorsService.moreOperators$;
    activeOperator$: Observable<Operator> = this._operatorsService.activeOperator$;
    hasPreviousOperators$: Observable<boolean> = this._operatorsService.hasPreviousOperators$;

    constructor(
        private _operatorsService: OperatorsService,
        private _modalService: NgbModal,
        private _notificationService: NotificationService,
        private _headerService: HeaderService,
        private _route: ActivatedRoute,
        private _router: Router
    ) { }

    ngOnInit() {
        this._headerService.setHeaderText(PAGE_TITLE);
    }

    nextPage() {
        this._operatorsService.nextPage();
    }

    previousPage() {
        this._operatorsService.previousPage();
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
        this._operatorsService.removeOperator(operator).first().subscribe(() => {
            this._notificationService.setNotificationOn(REMOVE_TOOL_SUCCESS_MESSAGE);
            this.operators$.first().subscribe(operators => {
                if ((operators.length - 1) == 0) {
                    this.previousPage();
                }
            });
        });
    }

}
