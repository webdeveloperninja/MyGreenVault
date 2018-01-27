import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, NgForm } from '@angular/forms';
import { ReceiverService, PagedList } from '../../services/receiver';
import { Pipe, PipeTransform } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { NgbModal, NgbActiveModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NotificationService, DEFAULT_NOTIFICATION_TIME } from '../../../shared/services/notification/notification.service';
import { HeaderService } from 'app/shared/services/header/header.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { alert } from 'app/shared/components/alert/alert.component';
import { Receiver } from '../../models/receiver';

const removeMessage = 'Successfully removed shippers';
const modalSize = 'lg';
const pageTitle = 'Shippers';

@Component({
    selector: 'products',
    templateUrl: './shippers.component.html',
    styleUrls: ['./shippers.component.scss']
})
export class ShippersComponent implements OnInit {
    title: string = pageTitle;
    
    @ViewChild('updateProductRef') updateProductRef: ElementRef;
    @ViewChild('addReceiverRef') addReceiverRef: ElementRef;

    receiverFormGroup: FormGroup;
    
    private _addReceiverModalRef: NgbModalRef;
    private _updateReceiverModalRef: NgbModalRef;

    receivers$: Observable<Receiver[]> = this._productService.products$;

    public confirmClicked = false;
    public cancelClicked = false;

    alert = alert;
    updateReceiverModal: any;

    private skip: number;
    private take: number;

    isReceiversLoading$: Observable<boolean> = this._productService.isProductsLoading$;
    activeReceiver$: Observable<Receiver> = this._productService.activeProduct$;
    hasPreviousReceivers$: Observable<boolean> = this._productService.hasPreviousProducts$;
    hasMoreReceivers$: Observable<boolean> = this._productService.hasMoreProducts$;

    constructor(
        private _productService: ReceiverService,
        private _modalService: NgbModal,
        private _notificationService: NotificationService,
        private _headerService: HeaderService,
        private _route: ActivatedRoute,
        private _router: Router,
        private _formBuilder: FormBuilder
    ) { }

    ngOnInit() {
        this._headerService.setHeaderText(pageTitle);
        this._productService.doSearch();

        this.receiverFormGroup = this._formBuilder.group({
            stateLicenseNumber: ['', Validators.required],
            typeOfLicense: ['', Validators.required],
            businessName: ['', Validators.required],
            businessAddress: ['', Validators.required],
            businessCity: ['', Validators.required],
            businessState: ['', Validators.required],
            businessZip: ['', Validators.required],
            phoneNumber: ['', Validators.required],
            contactName: ['', Validators.required],
            _id: ['']
        });
    }

    removeProduct(product: Receiver) {
        console.log('remove product');
    }

    nextPage() {
        this._productService.nextPage();
    }

    previousPage() {
        this._productService.previousPage();
    }

    openUpdateReceiverModal(receiver) {
        this.setReceiverForm(receiver);
        this._updateReceiverModalRef = this._modalService.open(this.updateProductRef, { size: modalSize });
    }

    setReceiverForm(receiver) {
        this.receiverFormGroup.controls.stateLicenseNumber.setValue(receiver.stateLicenseNumber);
        this.receiverFormGroup.controls.typeOfLicense.setValue(receiver.typeOfLicense);
        this.receiverFormGroup.controls.businessName.setValue(receiver.businessName);
        this.receiverFormGroup.controls.businessAddress.setValue(receiver.businessAddress);
        this.receiverFormGroup.controls.businessCity.setValue(receiver.businessCity);
        this.receiverFormGroup.controls.businessState.setValue(receiver.businessState);
        this.receiverFormGroup.controls.businessZip.setValue(receiver.businessZip);
        this.receiverFormGroup.controls.phoneNumber.setValue(receiver.phoneNumber);
        this.receiverFormGroup.controls.contactName.setValue(receiver.contactName);
        this.receiverFormGroup.controls._id.setValue(receiver._id);
    }

    closeUpdateReceiverModal() {
        this._updateReceiverModalRef.close();
    }

    closeAddProductModal() {
        this._addReceiverModalRef.close();
    }

    removeReceiver(receiver) {
        this._productService.remove(receiver).subscribe(data => {
            
        })
    }

    addReceiver() {
        this._addReceiverModalRef = this._modalService.open(this.addReceiverRef, { size: modalSize });
    }
}
