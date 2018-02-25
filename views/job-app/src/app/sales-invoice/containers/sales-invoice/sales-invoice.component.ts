import {
  Component,
  ViewChild,
  ElementRef,
  OnInit,
  OnDestroy
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HeaderService } from 'app/shared/services/header/header.service';
import { NotificationService } from 'app/shared/services/notification/notification.service';
import { ConstructionService } from 'app/construction.service';
import { createFormGroup as createReceiverFormGroup } from 'app/receivers/components/add-receiver/add-receiver.component';
import { SalesService } from 'app/sales-invoice/services/sales/sales.service';
import { Sale, SaleRequest } from 'app/sales-invoice/models';

import * as formUtilities from 'app/shared/utilities/forms';
const headerText = 'Sales Invoice / Shipping Manifest';

@Component({
  selector: 'ti-sales-invoice',
  templateUrl: './sales-invoice.component.html',
  styleUrls: ['./sales-invoice.component.scss']
})
export class SalesInvoiceComponent implements OnInit, OnDestroy {
  saleForm: FormGroup;
  emails: string[];

  constructor(
    private _fb: FormBuilder,
    private _headerService: HeaderService,
    private _notificationService: NotificationService,
    private _constructionService: ConstructionService,
    private _salesService: SalesService
  ) {}

  ngOnInit() {
    this.createForm();
    this.setHeader();
  }

  createForm(): void {
    this.saleForm = this._fb.group({
      email: ['', Validators.required],
      product: createProductFormGroup(this._fb),
      receiver: createReceiverFormGroup(this._fb)
    });
  }

  setHeader(): void {
    this._headerService.setHeaderText(headerText);
  }

  ngOnDestroy() {
    this._constructionService.turnOffConstruction();
    this._constructionService.turnTestFeatureOff();
  }

  sellProduct() {
    console.log('sell form', this.saleForm.valid);
    if (this.saleForm.valid) {
      this.makeSellRequest();
    } else {
      formUtilities.markFormGroupTouched(this.saleForm);
    }
  }

  

  makeSellRequest() {
    const request: SaleRequest = {
      data: this.createSale(),
      emails: this.saleForm.controls.email.value
    };

    this._salesService.sell(request);
  }

  createSale(): Sale {
    return {
      ...this.receiverFormGroup.value,
      ...this.productFormGroup.value
    };
  }

  get receiverFormGroup() {
    return this.saleForm.get('receiver');
  }

  get productFormGroup() {
    return this.saleForm.get('product');
  }

  addEmails(emails: string[]): void {
    this.emails = emails;
  }

  get hasEmails(): boolean {
    return this.emails && this.emails.length > 0;
  }
}

export function createProductFormGroup(formBuild: FormBuilder) {
  return formBuild.group({
    uidTagNumber: ['', Validators.required],
    itemName: ['', Validators.required],
    itemDescription: ['', Validators.required],
    itemWeightOrCount: ['', Validators.required],
    qtyOrdered: ['', Validators.required],
    unitCost: ['', Validators.required],
    totalCost: ['', Validators.required]
  });
}