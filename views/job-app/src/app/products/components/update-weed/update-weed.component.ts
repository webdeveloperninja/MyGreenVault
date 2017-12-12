import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { ProductService, Tool } from '../../services/product';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Observable, Subscription, Subject } from 'rxjs';
import { NotificationService, DEFAULT_NOTIFICATION_TIME } from '../../../shared/services/notification/notification.service';


@Component({
    selector: 'ti-update-tool',
    templateUrl: './update-weed.component.html',
    styleUrls: ['./update-weed.component.scss']
})
export class UpdateWeedComponent implements OnInit {

    activetoolFormGroup: FormGroup;

    @Input('skip') skip: number;
    @Input('take') take: number;

    @Output('closeUpdateModal')
    closeUpdateModal: EventEmitter<boolean> = new EventEmitter<boolean>();

    @Output('isLoading')
    isLoading: EventEmitter<boolean> = new EventEmitter<boolean>();

    activetoolSubscription$: Subscription;

    private _activetool: any;
    get activetool(): any {
        return this._activetool;
    }
    @Input('activeTool')
    set activetool(activetool: any) {
        activetool.subscribe(activetool => {
            this._activetool = activetool;
        })
    }

    constructor(
        private _fb: FormBuilder,
        private _productService: ProductService,
        private _notificationService: NotificationService
    ) { }

    ngOnInit() {
        this.activetoolFormGroup = this.createGroup();
    }

    ngOnDestroy() {
        if (this.activetoolSubscription$)
            this.activetoolSubscription$.unsubscribe()
    }

    createGroup() {
        const group = this._fb.group({
            toolName: [this.activetool.toolName, Validators.required],
            qty: [this.activetool.qty, Validators.required],
            idealAmount: [this.activetool.idealAmount, Validators.required],
            autoOrderQty: [this.activetool.autoOrderQty, Validators.required],
            toolCost: [this.activetool.toolCost, Validators.required],
            _id: [this.activetool._id, Validators.required]
        });
        return group;
    }

    updatetool(activetool) {
        this.activetoolSubscription$ = this._productService.updateTool(activetool.value).first().subscribe(data => {
            this.closeModal();
        });
    }

    closeModal() {
        this.closeUpdateModal.emit(true);
    }

}
