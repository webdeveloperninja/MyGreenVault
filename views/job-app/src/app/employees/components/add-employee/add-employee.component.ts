import { Component, OnInit, Input, ViewContainerRef, Output, EventEmitter, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl, NgForm } from '@angular/forms';
import { EmployeesService } from '../../services/employees';
import { Observable } from 'rxjs';

@Component({
    selector: 'add-operator',
    templateUrl: './add-employee.component.html',
    styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {
    operatorFormGroup: FormGroup;

    @Input() skip;
    @Input() take;

    @ViewChild('operatorForm') operatorForm: NgForm;

    @Output('closeAddOperatorModal')
    closeAddOperatorModal: EventEmitter<boolean> = new EventEmitter<boolean>();



    constructor(
        private _formBuilder: FormBuilder,
        private _employeesService: EmployeesService
    ) { }

    ngOnInit() {
        this.operatorFormGroup = this._formBuilder.group({
            operatorName: ['', Validators.required],
            operatorNumber: ['', Validators.required]
        });
    }

    addoperator(operatorFormGroup) {
        let operatorObj = {
            operatorName: this.operatorFormGroup.controls['operatorName'].value,
            operatorNumber: this.operatorFormGroup.controls['operatorNumber'].value
        };
        this._employeesService.addOperator(operatorObj).subscribe((operator) => {
            this._employeesService.doSearch();
        })
    }

    closeModal() {
        this.closeAddOperatorModal.emit(true);
    }
}
