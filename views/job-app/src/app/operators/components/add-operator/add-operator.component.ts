import { Component, OnInit, Input, ViewContainerRef, Output, EventEmitter, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl, NgForm } from '@angular/forms';
import { OperatorsService } from '../../services/operators';
import { Observable } from 'rxjs';

@Component({
    selector: 'add-operator',
    templateUrl: './add-operator.component.html',
    styleUrls: ['./add-operator.component.scss']
})
export class AddOperatorComponent implements OnInit {
    operatorFormGroup: FormGroup;

    @Input() skip;
    @Input() take;

    @ViewChild('operatorForm') operatorForm: NgForm;
    
    @Output('closeAddoperatorModal')
    closeAddoperatorModal: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor(
        private _formBuilder: FormBuilder,
        private _operatorsService: OperatorsService
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
        this._operatorsService.addOperator(operatorObj).subscribe((operator) => {
            this._operatorsService.doSearch();
        })
    }

  closeModal() {
    this.closeAddoperatorModal.emit(true);
  }
}
