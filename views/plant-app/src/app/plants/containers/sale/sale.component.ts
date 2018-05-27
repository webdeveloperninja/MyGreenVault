import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'gv-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.scss']
})
export class SaleComponent implements OnInit {
  defaultUnit = Unit.weight;

  saleForm: FormGroup;
  Unit = Unit;
  WeightUnit = WeightUnit;

  constructor(private readonly _formBuilder: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.saleForm = this._formBuilder.group({
      unit: [this.defaultUnit],
      weight: [],
      weightUnit: [WeightUnit.grams],
      cost: []
    });
  }

  get unitLabel(): string {
    const unit = this.saleForm.controls.unit.value;

    if (unit === Unit.qty) {
      return 'Qty';
    }

    if (unit === Unit.weight) {
      return 'Weight';
    }
  }

  sellProduct() {
    console.log(this.saleForm.value);
  }

  ngOnInit() {}
}

export enum Unit {
  qty,
  weight
}

export enum WeightUnit {
  grams,
  pounds,
  kilograms
}
