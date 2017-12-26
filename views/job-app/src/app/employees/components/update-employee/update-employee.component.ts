import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { EmployeesService, Operator } from '../../services/employees';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Observable, Subscription, Subject } from 'rxjs';
import { NotificationService, DEFAULT_NOTIFICATION_TIME } from '../../../shared/services/notification/notification.service';

@Component({
    selector: 'ti-update-operator',
    templateUrl: './update-employee.component.html',
    styleUrls: ['./update-employee.component.scss']
})
export class UpdateEmployeeComponent implements OnInit {

    @Input() skip: number;
    @Input() take: number;

    activeOperatorFormGroup: FormGroup;
    activeOperatorSubscription$: Subscription;

    @Output('closeUpdateModal')
    closeUpdateModal: EventEmitter<boolean> = new EventEmitter<boolean>();

    @Output('isLoading')
    isLoading: EventEmitter<boolean> = new EventEmitter<boolean>();


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
        private _employeesService: EmployeesService,
        private _notificationService: NotificationService
    ) { }

    ngOnInit() {
        this.createGroup();
    }

    ngOnDestroy() {
        if (this.activeOperatorSubscription$)
            this.activeOperatorSubscription$.unsubscribe()
    }

    createGroup() {
        this.activeOperatorFormGroup = this._fb.group({
            operatorName: [this.activeOperator.operatorName, Validators.required],
            operatorNumber: [this.activeOperator.operatorNumber, Validators.required],
            _id: [this.activeOperator._id, Validators.required]
        });
    }

    updateOperator(activeOperator) {
        this.activeOperatorSubscription$ = this._employeesService.updateOperator(this.activeOperatorFormGroup.value).subscribe(data => {
            this._employeesService.doSearch();
            this.closeModal();
        });
    }

    closeModal() {
        this.closeUpdateModal.emit(true);
    }
}
