import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NotificationService } from '../../../shared/services/notification/notification.service';
import * as textMask from '../../../shared/utilities/input-masking';
import { Observable } from 'rxjs/Observable';

import { markAsTouched } from '../../../shared/utilities/forms';
import { ExpenseService } from '../../services/expense';

const MODAL_SIZE = 'lg';

@Component({
  selector: 'plant-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss']
})
export class ExpensesComponent implements OnInit {
  showReadOnly = false;
  hasExpenses: boolean = false;
  expenseFormGroup: FormGroup;
  totalExpense = 0;

  mask = textMask.dollarAndCentsMask;

  private _addExpenseModalRef: NgbModalRef;

  private _plantNumber: string;

  get plantId(): string {
    return this._plantNumber;
  }

  @Input('plantId')
  set plantId(value: string) {
    if (value) {
      this._plantNumber = value;
      this._expenseService.updatePlantNumber(value);
      this._expenseService.getExpenses();
    }
  }

  @ViewChild('addExpenseRef') addExpenseRef: ElementRef;

  expenses$: Observable<Array<any>> = this._expenseService.expenses$.do(expenses => {
    if (expenses && expenses.length > 0) {
      this.hasExpenses = true;
    } else {
      this.hasExpenses = false;
    }

    if (expenses && expenses.length) {
      this.totalExpense = expenses.reduce((acc, expense) => {
        return (acc += Number(expense.cost));
      }, 0);
    } else {
      this.totalExpense = 0;
    }
  });

  expensesLoading$ = this._expenseService.expensesLoading$;

  formErrors = {
    name: '',
    cost: ''
  };

  showReadOnlyToggle() {
    if (this.showReadOnly) {
      this.showReadOnly = false;
    } else {
      this.showReadOnly = true;
    }
  }
  constructor(
    private _expenseService: ExpenseService,
    private _modalService: NgbModal,
    private _formBuilder: FormBuilder,
    private _notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.expenseFormGroup = this._formBuilder.group({
      name: ['', Validators.required],
      cost: ['', Validators.required]
    });
  }

  openAddExpenseModal() {
    this._addExpenseModalRef = this._modalService.open(this.addExpenseRef);
  }

  closeModal() {
    this._addExpenseModalRef.close();
  }

  addExpense() {
    if (this.expenseFormGroup.valid) {
      let expenseObj = {
        name: this.expenseFormGroup.controls['name'].value,
        cost: textMask.removeDollarAndCentsMask(this.expenseFormGroup.controls['cost'].value)
      };

      this._expenseService
        .addExpense(expenseObj)
        .first()
        .subscribe(expense => {
          this.expenseFormGroup.reset();
          this._notificationService.showSuccess('Added expense');
          this._expenseService.getExpenses();
        });
    } else {
      markAsTouched(this.expenseFormGroup);
    }
  }

  removeExpense(expense) {
    this._expenseService.removeExpense(expense).subscribe(data => {
      this._notificationService.showSuccess('Removed expense');
    });
  }

  getConfirmationMessage(name: string) {
    return `Are you sure you want to remove ${name}?`;
  }

  get name() {
    return this.expenseFormGroup.controls.name;
  }

  get cost() {
    return this.expenseFormGroup.controls.cost;
  }
}
