import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SaleService } from 'app/plants/services/sale.service';
import { markAsTouched } from 'app/shared/utilities/forms';

@Component({
  selector: 'gv-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.scss']
})
export class SaleComponent implements OnInit {
  @Input() plantNumber: number;

  defaultIsQuantity = true;
  saleForm: FormGroup;
  Unit = Unit;

  constructor(private readonly _formBuilder: FormBuilder, private readonly _saleService: SaleService) {
    this.createForm();
  }

  createForm() {
    this.saleForm = this._formBuilder.group({
      isQuantity: [this.defaultIsQuantity, Validators.required],
      quantity: [null, Validators.required],
      weight: [null, Validators.required],
      unit: [Unit.grams, Validators.required],
      cost: [null, Validators.required]
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
    return this.saleForm.controls.isQuantity.value;
  }

  get isWeight(): boolean {
    return !this.isQuantity;
  }

  get unitLabel(): string {
    if (this.isQuantity === true) {
      return 'Qty';
    }

    if (this.isQuantity === false) {
      return 'Weight';
    }
  }

  sellProduct() {
    if (this.saleForm.valid) {
      const saleRequest = {
        ...this.saleForm.value,
        plantNumber: this.plantNumber
      };

      this._saleService.sellProduct(saleRequest);
    } else {
      markAsTouched(this.saleForm);
    }
  }

  ngOnInit() {
    this.saleForm.controls.isQuantity.valueChanges.subscribe(isQuantity => {
      const isWeight = !isQuantity;

      if (isQuantity) {
        this.enableQuantityForm();
        this.disableWeightForm();
      } else if (isWeight) {
        this.enableWeightForm();
        this.disableQuantityForm();
      }
    });
  }

  private enableQuantityForm(): void {
    this.saleForm.controls.quantity.enable();
  }

  private enableWeightForm(): void {
    this.saleForm.controls.weight.enable();
    this.saleForm.controls.unit.enable();
  }

  private disableQuantityForm(): void {
    this.saleForm.controls.quantity.disable();
  }

  private disableWeightForm(): void {
    this.saleForm.controls.weight.disable();
    this.saleForm.controls.unit.disable();
  }

  get weight() {
    return this.saleForm.get('weight');
  }

  get quantity() {
    return this.saleForm.get('quantity');
  }

  get cost() {
    return this.saleForm.get('cost');
  }
}

export enum Unit {
  grams,
  pounds,
  kilograms
}
