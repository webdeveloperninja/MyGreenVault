import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { EmployeesService, PagedList, Operator } from '../../services/employees';
import { Pipe, PipeTransform } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { NgbModal, NgbActiveModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NotificationService, DEFAULT_NOTIFICATION_TIME } from 'app/shared/services/notification/notification.service';
import { HeaderService } from 'app/shared/services/header/header.service';
import { alert } from 'app/shared/components/alert/alert.component';

import { Router, ActivatedRoute, Params } from '@angular/router';

const REMOVE_TOOL_SUCCESS_MESSAGE: string = 'Successfully Removed Operator';
const MODAL_SIZE = 'lg';
const PAGE_TITLE: string = 'Shippers';

@Component({
    selector: 'ti-operators',
    templateUrl: './employees.component.html',
    styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {

    public title: string = 'Remove employee';
    public message: string = 'Are you sure you want to remove employee? ';
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

    operators$: Observable<Operator[]> = this._employeesService.operators$.do(operators => {
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

    isOperatorsLoading$: Observable<boolean> = this._employeesService.isOperatorsLoading$;
    moreOperators$: Observable<boolean> = this._employeesService.moreOperators$;
    activeOperator$: Observable<Operator> = this._employeesService.activeOperator$;
    hasPreviousOperators$: Observable<boolean> = this._employeesService.hasPreviousOperators$;

    constructor(
        private _employeesService: EmployeesService,
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
        this._employeesService.nextPage();
    }

    previousPage() {
        this._employeesService.previousPage();
    }

    openUpdateOperatorModal(operatorId) {
        this._employeesService.setActiveOperator(operatorId);
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
        this._employeesService.removeOperator(operator).first().subscribe(() => {
            this._notificationService.setNotificationOn(REMOVE_TOOL_SUCCESS_MESSAGE);
            this.operators$.first().subscribe(operators => {
                if ((operators.length - 1) == 0) {
                    this.previousPage();
                }
            });
        });
    }

}
