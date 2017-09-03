import { Component, OnInit, Input, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
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

  checkoutTool() {
    let toolCheckout: ToolCheckout = {
        toolQty: Number(this.checkoutToolFormGroup.controls['toolQty'].value),
        operatorNumber: Number(this.checkoutToolFormGroup.controls['operatorNumber'].value),
        jobNumber: Number(this.checkoutToolFormGroup.controls['jobNumber'].value),
        tool: this.tool
    };

    this._toolsService.checkoutTool(toolCheckout).subscribe(data => {

    });
  }

}

export interface ToolCheckout {
  toolQty: Number;
  operatorNumber: Number;
  jobNumber: Number;
  tool: Tool
}