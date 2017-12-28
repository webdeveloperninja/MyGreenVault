import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { TodoService } from '../../../services/todo';
import { NgbModal, NgbActiveModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators, FormControl, NgForm } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

const MODAL_SIZE = 'lg';

@Component({
    selector: 'plant-todo',
    templateUrl: './todo.component.html',
    styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
    todoFormGroup: FormGroup;
    private _addTodoModalRef: NgbModalRef;

    private _plantNumber: string;
    
    get plantNumber(): string {
        return this._plantNumber;
    }

    @Input('plantNumber') 
    set plantNumber(value: string) {
        if (value) {
            this._plantNumber = value;
            this._todoService.updatePlantNumber(value);
            this._todoService.get();
        }
    }

    @ViewChild('addTodoRef') addTodoRef: ElementRef;

    todos$: Observable<Array<any>> = this._todoService.todos$;

    formErrors = {
        'todo': ''
    };

    constructor(
        private _todoService: TodoService,
        private _modalService: NgbModal,
        private _formBuilder: FormBuilder
    ) { }

    ngOnInit() {
        this.todoFormGroup = this._formBuilder.group({
            name: ['', Validators.required]
        });
    }

    openAddTodoModal() {
        this._addTodoModalRef = this._modalService.open(this.addTodoRef, { size: MODAL_SIZE });
    }

    addTodo() {
        let todoObj = {
            name: this.todoFormGroup.controls['name'].value
        };

        this._todoService.add(todoObj).first().subscribe((expense) => {
            this._todoService.get();
        });
    }

    removeExpense(expense) {
        // console.log('expense', expense);
        // this._todoService.removeExpense(expense);
    }

    getConfirmationMessage(name: string) {
        return `Are you sure you want to complete ${name}?`
    }

}
