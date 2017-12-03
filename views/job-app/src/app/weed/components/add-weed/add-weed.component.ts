import { Component, OnInit, Input, ViewContainerRef, Output, EventEmitter, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl, NgForm } from '@angular/forms';
import { WeedService } from '../../services/weed';
import { Observable } from 'rxjs';

@Component({
    selector: 'add-tool',
    templateUrl: './add-weed.component.html',
    styleUrls: ['./add-weed.component.scss']
})
export class AddWeedComponent implements OnInit {
    toolFormGroup: FormGroup;
    isAddToolLoading: boolean = false;
    addToolSuccess: boolean = false;

    @ViewChild('toolForm') toolForm: NgForm;

    @Output('closeAddToolModal')
    closeAddToolModal: EventEmitter<boolean> = new EventEmitter<boolean>();

    @Input('skip') skip: number;
    @Input('take') take: number;

    constructor(
        private _formBuilder: FormBuilder,
        private _weedService: WeedService
    ) { }

    ngOnInit() {
        this.toolFormGroup = this._formBuilder.group({
            toolName: ['', Validators.required],
            qty: ['', Validators.required],
            idealAmount: ['', Validators.required],
            autoOrderQty: ['', Validators.required],
            toolCost: ['', Validators.required],
        });
    }

    addTool(toolFormGroup) {
        this.isAddToolLoading = true;
        let toolObj = {
            toolName: this.toolFormGroup.controls['toolName'].value,
            qty: this.toolFormGroup.controls['qty'].value,
            idealAmount: this.toolFormGroup.controls['idealAmount'].value,
            autoOrderQty: this.toolFormGroup.controls['autoOrderQty'].value,
            toolCost: this.toolFormGroup.controls['toolCost'].value,
        };
        this._weedService.addTool(toolObj).subscribe((tool) => {
            if (1 === 1) {
                this.toolFormGroup.reset();
                // this._toolsService.getTools(this.skip, this.take).first().subscribe();
                this.isAddToolLoading = false;
                this.addToolSuccess = true;
                Observable.timer(5000).first().subscribe(data => {
                    this.addToolSuccess = false;
                });
            } else {
                this.isAddToolLoading = false;
            }
        })
    }

    closeModal() {
        this.closeAddToolModal.emit(true);
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
            'required': 'Company Name is required.'
        },
        'contactName': {
            'required': 'Contact Name is required.'
        },
        'contactPhoneNumber': {
            'required': 'Phone Number is required.'
        },
        'contactEmail': {
            'required': 'Contact Email is required.'
        },
        'toolNumber': {
            'required': 'tool Number is required.'
        },
        'toolName': {
            'required': 'tool Name is required.'
        },
        'toolDescription': {
            'required': 'tool Description is required.'
        },
    };

}
