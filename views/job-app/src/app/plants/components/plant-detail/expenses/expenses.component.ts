import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { ExpenseService } from '../../../services/expense';
import { NgbModal, NgbActiveModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators, FormControl, NgForm } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

const MODAL_SIZE = 'lg';

@Component({
    selector: 'plant-expenses',
    templateUrl: './expenses.component.html',
    styleUrls: ['./expenses.component.scss']
})
export class ExpensesComponent implements OnInit {
    expenseFormGroup: FormGroup;
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

    expenses$: Observable<Array<any>> = this._expenseService.expenses$;

    formErrors = {
        'name': '',
        'cost': ''
    };

    constructor(
        private _expenseService: ExpenseService,
        private _modalService: NgbModal,
        private _formBuilder: FormBuilder
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

    addExpense() {
        let expenseObj = {
            name: this.expenseFormGroup.controls['name'].value,
            cost: this.expenseFormGroup.controls['cost'].value
        };

        this._expenseService.addExpense(expenseObj).first().subscribe((expense) => {
            this._expenseService.getExpenses();
        });
    }
}

