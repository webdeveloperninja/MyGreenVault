import { Component, OnInit, Input, ViewContainerRef, Output, EventEmitter, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl, NgForm } from '@angular/forms';
import { ToolsService } from '../../services/tools';
import { Observable } from 'rxjs';

@Component({
    selector: 'add-tool',
    templateUrl: './add-tool.component.html',
    styleUrls: ['./add-tool.component.scss']
})
export class AddToolComponent implements OnInit {
    toolFormGroup: FormGroup;

    toolSuccessfullyAdded: boolean = false;

    @ViewChild('toolForm') toolForm: NgForm;

    @Output('closeAddtoolModal')
    closeAddtoolModal: EventEmitter<boolean> = new EventEmitter<boolean>();

    @Input('skip') skip: number;
    @Input('take') take: number;

    constructor(
        private _formBuilder: FormBuilder,
        private _toolsService: ToolsService
    ) { }
    
    ngOnInit() {

        this.toolFormGroup = this._formBuilder.group({
            companyName: ['', Validators.required],
            contactName: ['', Validators.required],
            contactPhoneNumber: ['', Validators.required],
            contactEmail: ['', Validators.required],
            toolName: ['', Validators.required],
            toolNumber: ['', Validators.required],
            toolDescription: ['', Validators.required],
            toolStatus: ['', Validators.required]
        });
    }

    addtool(toolFormGroup) {
        let toolObj = {
            companyName: this.toolFormGroup.controls['companyName'].value,
            contactName: this.toolFormGroup.controls['contactName'].value,
            contactPhoneNumber: this.toolFormGroup.controls['contactPhoneNumber'].value,
            contactEmail: this.toolFormGroup.controls['contactEmail'].value,
            toolName: this.toolFormGroup.controls['toolName'].value,
            toolNumber: this.toolFormGroup.controls['toolNumber'].value,
            toolDescription: this.toolFormGroup.controls['toolDescription'].value,
            toolStatus: this.toolFormGroup.controls['toolStatus'].value
        };
        this._toolsService.addtool(toolObj).subscribe((tool) => {
            if(tool.success) {
                this.toolFormGroup.reset();
                this.toolSuccessfullyAdded = true;
                this._toolsService.gettools(this.skip, this.take).subscribe();
                Observable.timer(5000).subscribe(() => {
                    this.toolSuccessfullyAdded = false;
                })
            } else {
            }
        })
    }

  closeModal() {
    this.closeAddtoolModal.emit(true);
  }

ngAfterViewChecked() {
  this.formChanged();
}

formChanged() {
  if (this.toolForm) {
    this.toolForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
  }
}


onValueChanged(data?: any) {
  if (!this.toolForm) { return; }
  const form = this.toolForm.form;
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
  'toolNumber': '',
  'toolName': '',
  'toolDescription': ''
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
  'toolNumber': {
    'required':      'tool Number is required.'
  },
  'toolName': {
    'required':      'tool Name is required.'
  },
  'toolDescription': {
    'required':      'tool Description is required.'
  },
};

}
