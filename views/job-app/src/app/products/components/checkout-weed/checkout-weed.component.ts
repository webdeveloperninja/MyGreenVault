import { Component, OnInit, Input, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import { BehaviorSubject } from 'rxjs';
import { Http, Headers, Response } from '@angular/http';
import { FormBuilder, FormGroup, Validators, FormControl, NgForm } from '@angular/forms';
import { NotificationService, DEFAULT_NOTIFICATION_TIME } from '../../../shared/services/notification/notification.service';
import { WeedService, Tool } from '../../services/weed';

@Component({
    selector: 'ti-checkout-tool',
    templateUrl: './checkout-weed.component.html',
    styleUrls: ['./checkout-weed.component.scss'],
    providers: []
})
export class CheckoutWeedComponent implements OnInit {
    checkoutToolFormGroup: FormGroup;
    @Input() tool: any;
    @Input() skip: number;
    @Input() take: number;

    operatorInputMessage: string = null;
    operatorInputStatus: string = null;

    jobInputMessage: string = null;
    jobInputStatus: string = null;

    toolQtyInputMessage: string = null;
    toolQtyInputStatus: string = null;

    private _isCheckoutLoadingSubject$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public readonly isCheckoutLoading$: Observable<boolean> = this._isCheckoutLoadingSubject$.asObservable();

    constructor(
        private _formBuilder: FormBuilder,
        private _notificationService: NotificationService,
        private _weedService: WeedService
    ) { }


    ngOnInit() {
        this.checkoutToolFormGroup = this._formBuilder.group({
            toolQty: ['', Validators.required],
            operatorNumber: ['', Validators.required],
            jobNumber: ['', Validators.required]
        });
    }

    clearMessages() {
        this.operatorInputMessage = null;
        this.operatorInputStatus = null;

        this.jobInputMessage = null;
        this.jobInputStatus = null;

        this.toolQtyInputMessage = null;
        this.toolQtyInputStatus = null;
    }

    clearForm() {
        this.checkoutToolFormGroup.reset();
    }


    checkoutTool() {

        this._isCheckoutLoadingSubject$.next(true);
        this.clearMessages();

        let toolCheckout: ToolCheckout = {
            toolQty: Number(this.checkoutToolFormGroup.controls['toolQty'].value),
            operatorNumber: Number(this.checkoutToolFormGroup.controls['operatorNumber'].value),
            jobNumber: Number(this.checkoutToolFormGroup.controls['jobNumber'].value),
            tool: this.tool,
            cost: (this.tool.toolCost * Number(this.checkoutToolFormGroup.controls['toolQty'].value))
        };


        this._weedService.checkoutTool(toolCheckout)
            .first()
            .subscribe(data => {
                this._isCheckoutLoadingSubject$.next(false);
            }, (err) => {

                this._isCheckoutLoadingSubject$.next(false);

                let response = err.error;

                if (response && response.operatorNumber) {
                    this.operatorInputMessage = response.operatorNumber.message;
                    this.operatorInputStatus = response.operatorNumber.status;
                }

                if (response && response.jobNumber) {
                    this.jobInputMessage = response.jobNumber.message;
                    this.jobInputStatus = response.jobNumber.status;
                }

                if (response && response.toolQty) {
                    this.toolQtyInputMessage = response.toolQty.message;
                    this.toolQtyInputStatus = response.toolQty.status;
                }

            });
    }

}

export interface ToolCheckout {
    toolQty: Number;
    operatorNumber: Number;
    jobNumber: Number;
    tool: Tool;
    cost: Number;
}