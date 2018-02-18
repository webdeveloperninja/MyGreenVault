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
import { Sale } from 'app/sales-invoice/models';

const headerText: string = 'Sales Invoice / Shipping Manifest';

// productUid: { type: String, require: true },
// productName: { type: String, require: true },
// productDescription: { type: String, require: true },
// productWeightOrCount: { type: Number, require: true },
// productQtyOrdered: { type: Number, require: true },
// productUnitCost: { type: Number, require: true },
// productTotalCost: { type: Number, require: true },
// receiverQtyReceived: { type: Number, require: true },
// receiverUnitRetailValue: { type: Number, require: true },
// receiverTotalRetailValue: { type: Number, require: true },
// receiverName: { type: String, require: true },
// receiverEmail: { type: String, require: true },
// receiverPhoneNumber: { type: String, require: true },
// receiverBusinessZip: { type: String, require: true },
// receiverBusinessState: { type: String, require: true },
// receiverBusinessCity: { type: String, require: true },
// receiverBusinessAddress: { type: String, require: true },
// receiverBusinessName: { type: String, require: true },
// receiverTypeOfLicense: { type: String, require: true },
// receiverStateLicenseNumber: { type: String, require: true },
// userId: { type: String, required: true }

@Component({
  selector: 'ti-sales-invoice',
  templateUrl: './sales-invoice.component.html',
  styleUrls: ['./sales-invoice.component.scss']
})
export class SalesInvoiceComponent implements OnInit, OnDestroy {
  saleForm: FormGroup;

  addProduct = true;
  addReceiver = false;
  receiverInformation = false;

  resetSteps() {
    this.addProduct = false;
    this.addReceiver = false;
    this.receiverInformation = false;
  }

  constructor(
    private _fb: FormBuilder,
    private _headerService: HeaderService,
    private _notificationService: NotificationService,
    private _constructionService: ConstructionService,
    private _salesService: SalesService
  ) {}

  ngOnInit() {
    setTimeout(() => this._constructionService.turnOnConstruction());

    this.saleForm = this._fb.group({
      product: this._fb.group({
        uidTagNumber: [''],
        itemName: [''],
        itemDescription: [''],
        itemWeightOrCount: [''],
        qtyOrdered: [''],
        unitCost: [''],
        totalCost: ['']
      }),
      receiver: this._fb.group({
        qtyReceived: [''],
        unitRetailValue: [''],
        totalRetailValue: [''],
        receiverInformation: createReceiverFormGroup(this._fb)
      })
    });

    this._headerService.setHeaderText(headerText);
  }

  ngOnDestroy() {
    this._constructionService.turnOffConstruction();
    this._constructionService.turnTestFeatureOff();
  }

  sellProduct() {
    const sale: Sale = {
      ...this.receiverFormGroup.value,
      ...this.productFormGroup.value
    };

    this._salesService.makeSale(sale);
  }

  select(type) {
    this.resetSteps();
    if (type === 'product') {
      this.addProduct = true;
    } else if (type === 'receiver') {
      this.addReceiver = true;
    } else if (type === 'receiver-info') {
      this.receiverInformation = true;
    } else {
      this.addProduct = true;
    }
  }

  get receiverFormGroup() {
    return this.saleForm.get('receiver.receiverInformation');
  }

  get productFormGroup() {
    return this.saleForm.get('product');
  }

  addEmails(emails: string[]): void {
    console.log('emails', emails);
  }
}

