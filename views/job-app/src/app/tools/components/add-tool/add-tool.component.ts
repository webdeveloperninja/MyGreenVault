import { Component, OnInit, Input, ViewContainerRef, Output, EventEmitter, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl, NgForm } from '@angular/forms';
import { NotificationService, DEFAULT_NOTIFICATION_TIME } from '../../../shared/services/notification/notification.service';
import { ToolsService } from '../../services/tools';
import { Observable } from 'rxjs';

@Component({
    selector: 'add-tool',
    templateUrl: './add-tool.component.html',
    styleUrls: ['./add-tool.component.scss']
})
export class AddToolComponent implements OnInit {
    toolFormGroup: FormGroup;

    @ViewChild('toolForm') toolForm: NgForm;

    @Output('closeAddtoolModal')
    closeAddtoolModal: EventEmitter<boolean> = new EventEmitter<boolean>();

    @Input('skip') skip: number;
    @Input('take') take: number;

    constructor(
        private _formBuilder: FormBuilder,
        private _toolsService: ToolsService,
        private _notificationService: NotificationService
    ) { }
    
    ngOnInit() {

        this.toolFormGroup = this._formBuilder.group({
            toolName: ['', Validators.required],
            qty: ['', Validators.required],
            idealAmount: ['', Validators.required],
            autoOrderQty: ['', Validators.required],
        });
    }

    addTool(toolFormGroup) {
        let toolObj = {
            toolName: this.toolFormGroup.controls['toolName'].value,
            qty: this.toolFormGroup.controls['qty'].value,
            idealAmount: this.toolFormGroup.controls['idealAmount'].value,
            autoOrderQty: this.toolFormGroup.controls['autoOrderQty'].value,
        };
        this._toolsService.addTool(toolObj).subscribe((tool) => {
            if(tool.success) {

                this._notificationService.setNotificationOn('Successfully added tool');
                Observable.timer(DEFAULT_NOTIFICATION_TIME).subscribe(() => {
                  this._notificationService.setNotificationOff();
                });
                this.toolFormGroup.reset();
                this.closeModal();
                this._toolsService.gettools(this.skip, this.take).subscribe();

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
