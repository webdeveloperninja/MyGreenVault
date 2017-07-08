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

    operatorSuccessfullyAdded: boolean = false;

    @ViewChild('operatorForm') operatorForm: NgForm;

    @Output('closeAddoperatorModal')
    closeAddoperatorModal: EventEmitter<boolean> = new EventEmitter<boolean>();

    @Input('skip') skip: number;
    @Input('take') take: number;

    constructor(
        private _formBuilder: FormBuilder,
        private _operatorsService: OperatorsService
    ) { }
    
    ngOnInit() {

        this.operatorFormGroup = this._formBuilder.group({
            operatorName: ['', Validators.required],
            operatorNumber: ['', Validators.required,  Validators.pattern('[A-Za-z]{5}')]
        });
    }

    addoperator(operatorFormGroup) {
        let operatorObj = {
            operatorName: this.operatorFormGroup.controls['operatorName'].value,
            operatorNumber: this.operatorFormGroup.controls['operatorNumber'].value
        };
        this._operatorsService.addOperator(operatorObj).subscribe((operator) => {
            if(operator.success) {
                this.operatorFormGroup.reset();
                this.operatorSuccessfullyAdded = true;
                this._operatorsService.getOperators().subscribe();
                Observable.timer(5000).subscribe(() => {
                    this.operatorSuccessfullyAdded = false;
                })
            } else {
            }
        })
    }

  closeModal() {
    this.closeAddoperatorModal.emit(true);
  }

ngAfterViewChecked() {
  this.formChanged();
}

formChanged() {
  if (this.operatorForm) {
    this.operatorForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
  }
}


onValueChanged(data?: any) {
  if (!this.operatorForm) { return; }
  const form = this.operatorForm.form;
  for (const field in this.formErrors) {
    this.formErrors[field] = '';
    const control = form.get(field);
    if (control && control.dirty && !control.valid) {
      const messages = this.validationMessages[field];
      for (const key in control.errors) {
        this.formErrors[field] += messages[key] + ' ';
      }
    }
  }
}

formErrors = {
  'companyName': '',
  'contactName': '',
  'contactPhoneNumber': '',
  'contactEmail': '',
  'operatorNumber': '',
  'operatorName': '',
  'operatorDescription': ''
};

validationMessages = {
  'companyName': {
    'required':      'Company Name is required.'
  },
  'contactName': {
    'required':      'Contact Name is required.'
  },
  'contactPhoneNumber': {
    'required':      'Phone Number is required.'
  },
  'contactEmail': {
    'required':      'Contact Email is required.'
  },
  'operatorNumber': {
    'required':      'operator Number is required.'
  },
  'operatorName': {
    'required':      'operator Name is required.'
  },
  'operatorDescription': {
    'required':      'operator Description is required.'
  },
};

}
