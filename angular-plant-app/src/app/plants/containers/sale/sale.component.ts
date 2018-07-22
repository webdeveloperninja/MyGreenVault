import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SaleService } from '../../services/sale.service';
import { markAsTouched } from '../../../shared/utilities/forms';
import * as textMask from '../../../shared/utilities/input-masking';

import { Unit } from '../../models';

@Component({
  selector: 'gv-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.scss']
})
export class SaleComponent implements OnInit {
  @Input() plantNumber: number;
  @Input() showSellButton: boolean = true;
  @Output() saleSuccess = new EventEmitter();

  defaultIsQuantity = false;
  saleForm: FormGroup;
  Unit = Unit;
  dollarAndCents = textMask.dollarAndCentsMask;

  sellingPlantLoading$ = this._saleService.sellingPlantLoading$;

  constructor(private readonly _formBuilder: FormBuilder, private readonly _saleService: SaleService) {
    this.createForm();
  }

  createForm() {
    this.saleForm = this._formBuilder.group({
      data: this._formBuilder.group({
        isQuantity: [this.defaultIsQuantity, Validators.required],
        quantity: [null, Validators.required],
        weight: [null, Validators.required],
        unit: [Unit.grams, Validators.required],
        cost: [null, Validators.required],
        contact: this._formBuilder.group({
          name: [null],
          email: [null],
          phone: [null]
        })
      }),
      metaData: this._formBuilder.group({
        includeContact: [false]
      })
    });

    if (this.defaultIsQuantity) {
      this.enableQuantityForm();
      this.disableWeightForm();
    } else {
      this.enableWeightForm();
      this.disableQuantityForm();
    }
  }

  get isQuantity(): boolean {
    return this.saleDataForm.controls.isQuantity.value;
  }

  get isWeight(): boolean {
    return !this.isQuantity;
  }

  get includeContact(): boolean {
    return this.saleMetaDataForm.controls.includeContact.value;
  }

  get unitLabel(): string {
    if (this.isQuantity === true) {
      return 'Qty';
    }

    if (this.isQuantity === false) {
      return 'Weight';
    }
  }

  getSale() {
    const sale = this.saleDataForm.value;
    const costWithoutDollar = this.saleDataForm.controls.cost.value.replace('$', '').replace(/,/g, '');

    return {
      ...sale,
      cost: costWithoutDollar
    };
  }

  sellProduct() {
    if (this.saleForm.valid) {
      let saleRequest;
      const sale = this.getSale();

      if (this.includeContact) {
        saleRequest = {
          ...sale,
          ...this.contactForm.value,
          plantNumber: this.plantNumber
        };
      } else {
        saleRequest = {
          ...sale,
          plantNumber: this.plantNumber
        };

        delete saleRequest.contact;
        console.log(saleRequest);
      }

      this._saleService.sellProduct(saleRequest);
    } else {
      markAsTouched(this.saleDataForm);
      markAsTouched(this.contactForm);
    }
  }

  ngOnInit() {
    this.saleDataForm.controls.isQuantity.valueChanges.subscribe(isQuantity => {
      const isWeight = !isQuantity;

      if (isQuantity) {
        this.enableQuantityForm();
        this.disableWeightForm();
        this.saleForm.updateValueAndValidity();
      } else if (isWeight) {
        this.enableWeightForm();
        this.disableQuantityForm();
        this.saleForm.updateValueAndValidity();
      }
    });

    this.saleMetaDataForm.controls.includeContact.valueChanges.subscribe(includeContact => {
      if (includeContact) {
        this.contactForm.controls.name.setValidators(Validators.required);
        this.contactForm.controls.email.setValidators(Validators.required);
        this.contactForm.controls.phone.setValidators(Validators.required);
        this.contactForm.updateValueAndValidity();
      } else {
        this.contactForm.controls.name.clearValidators();
        this.contactForm.controls.email.clearValidators();
        this.contactForm.controls.phone.clearValidators();
        this.contactForm.updateValueAndValidity();
      }
    });

    this._saleService.saleSucceded$.subscribe(() => this.saleSuccess.emit());
  }

  private resetForm(): void {
    this.saleDataForm.controls.quantity.setValue(null);
    this.saleDataForm.controls.weight.setValue(null);
    this.saleDataForm.controls.cost.setValue(null);

    this.saleDataForm.controls.quantity.markAsPending();
    this.saleDataForm.controls.weight.markAsPending();
    this.saleDataForm.controls.cost.markAsPending();
  }

  private enableQuantityForm(): void {
    this.saleDataForm.controls.quantity.enable();
  }

  private enableWeightForm(): void {
    this.saleDataForm.controls.weight.enable();
    this.saleDataForm.controls.unit.enable();
  }

  private disableQuantityForm(): void {
    this.saleDataForm.controls.quantity.disable();
  }

  private disableWeightForm(): void {
    this.saleDataForm.controls.weight.disable();
    this.saleDataForm.controls.unit.disable();
  }

  get weight() {
    return this.saleDataForm.get('weight');
  }

  get phone() {
    return this.contactForm.get('phone');
  }

  get name() {
    return this.contactForm.get('name');
  }

  get email() {
    return this.contactForm.get('email');
  }

  get quantity() {
    return this.saleDataForm.get('quantity');
  }

  get cost() {
    return this.saleDataForm.get('cost');
  }

  get unitCode() {
    return this.saleDataForm.get('unit').value;
  }

  get saleDataForm(): FormGroup {
    return this.saleForm.get('data') as FormGroup;
  }

  get saleMetaDataForm(): FormGroup {
    return this.saleForm.get('metaData') as FormGroup;
  }

  get contactForm(): FormGroup {
    return this.saleDataForm.get('contact') as FormGroup;
  }
}
