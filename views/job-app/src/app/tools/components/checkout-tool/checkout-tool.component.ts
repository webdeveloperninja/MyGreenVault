import { Component, OnInit, Input, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import { BehaviorSubject } from 'rxjs';
import { Http, Headers, Response } from '@angular/http';
import { FormBuilder, FormGroup, Validators, FormControl, NgForm } from '@angular/forms';
import { NotificationService, DEFAULT_NOTIFICATION_TIME } from '../../../shared/services/notification/notification.service';
import { ToolsService, Tool } from '../../services/tools';

@Component({
  selector: 'ti-checkout-tool',
  templateUrl: './checkout-tool.component.html',
  styleUrls: ['./checkout-tool.component.scss'],
  providers: []
})
export class CheckoutToolComponent implements OnInit {
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
    private _toolsService: ToolsService
    ) {}


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
        this.jobInputStatus  = null;

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

        console.log('checkout tool', toolCheckout);

        this._toolsService.checkoutTool(toolCheckout)
            .first()
            .subscribe(data => {
                console.log('yay');
                this._isCheckoutLoadingSubject$.next(false);
            }, (err) => {

                this._isCheckoutLoadingSubject$.next(false);

                let response = JSON.parse(err._body);
                
                // if (response.operatorNumber) {
                //     this.operatorInputMessage = response.operatorNumber.message;
                //     this.operatorInputStatus = response.operatorNumber.status;
                // }

                if (response.jobNumber) {
                    this.jobInputMessage = response.jobNumber.message;
                    this.jobInputStatus = response.jobNumber.status;
                }

                // if (response.toolQty) {
                //     this.toolQtyInputMessage = response.toolQty.message;
                //     this.toolQtyInputStatus = response.toolQty.status;
                // }
            
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