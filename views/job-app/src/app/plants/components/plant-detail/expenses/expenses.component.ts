import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { ExpenseService } from '../../../services/expense';
import { NgbModal, NgbActiveModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators, FormControl, NgForm } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import createNumberMask from 'text-mask-addons/dist/createNumberMask'
import { NotificationService } from 'app/shared/services/notification/notification.service';

const MODAL_SIZE = 'lg';

@Component({
    selector: 'plant-expenses',
    templateUrl: './expenses.component.html',
    styleUrls: ['./expenses.component.scss']
})
export class ExpensesComponent implements OnInit {
    hasExpenses: boolean = false;
    expenseFormGroup: FormGroup;
    totalExpense = 0;

    mask = numberMask;

    private _addExpenseModalRef: NgbModalRef;

    private _plantNumber: string;

    get plantNumber(): string {
        return this._plantNumber;
    }

    @Input('plantNumber')
    set plantNumber(value: string) {
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
            this.totalExpense = expenses.reduce((acc, expense) => { return acc += Number(expense.cost); }, 0);
        } else {
            this.totalExpense = 0;
        }
    });

    expensesLoading$ = this._expenseService.expensesLoading$;
    
    formErrors = {
        'name': '',
        'cost': ''
    };

    constructor(
        private _expenseService: ExpenseService,
        private _modalService: NgbModal,
        private _formBuilder: FormBuilder,
        private _notificationService: NotificationService
    ) { }

    ngOnInit() {
        this.expenseFormGroup = this._formBuilder.group({
            name: ['', Validators.required],
            cost: ['', Validators.required]
        });
    }

    openAddExpenseModal() {
        this._addExpenseModalRef = this._modalService.open(this.addExpenseRef, { size: MODAL_SIZE });
    }

    closeModal() {
        this._addExpenseModalRef.close();
    }

    addExpense() {
        let expenseObj = {
            name: this.expenseFormGroup.controls['name'].value,
            cost: removeNumberMask(this.expenseFormGroup.controls['cost'].value)
        };
        
        this._expenseService.addExpense(expenseObj).first().subscribe((expense) => {
            this.expenseFormGroup.reset();
            this._notificationService.showSuccess('Added expense');
            this._expenseService.getExpenses();
        });
    }

    removeExpense(expense) {
        this._expenseService.removeExpense(expense).subscribe(data => {
            this._notificationService.showSuccess('Removed expense');
        });
    }

    getConfirmationMessage(name: string) {
        return `Are you sure you want to remove ${name}?`
    }


}

const numberMask = createNumberMask({
    prefix: '',
    suffix: ' $',
    allowDecimal: true
})

function removeNumberMask(maskedNumber) {
    return maskedNumber.replace('$', '').replace(',', '').trim();
};