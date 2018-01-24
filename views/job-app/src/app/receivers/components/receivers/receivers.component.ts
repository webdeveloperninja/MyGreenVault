import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ProductService, PagedList } from '../../services/product';
import { Pipe, PipeTransform } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { NgbModal, NgbActiveModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NotificationService, DEFAULT_NOTIFICATION_TIME } from '../../../shared/services/notification/notification.service';
import { HeaderService } from 'app/shared/services/header/header.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { alert } from 'app/shared/components/alert/alert.component';
import { Product } from '../../models/Product';

const REMOVE_TOOL_SUCCESS_MESSAGE: string = 'Successfully Removed Tool';
const MODAL_SIZE = 'lg';
const DEFAULT_TAKE: number = 10;
const PAGE_TITLE: string = 'Receivers';

@Component({
    selector: 'products',
    templateUrl: './receivers.component.html',
    styleUrls: ['./receivers.component.scss']
})
export class ReceiversComponent implements OnInit {

    @ViewChild('updateProductRef') updateProductRef: ElementRef;
    @ViewChild('addProductRef') addProductRef: ElementRef;

    private _addReceiverModalRef: NgbModalRef;
    private _updateReceiverModalRef: NgbModalRef;

    receivers$: Observable<Product[]> = this._productService.products$;

    public title = 'Remove receiver';
    public message = 'Are you sure you want to remove receiver: ';

    public confirmClicked = false;
    public cancelClicked = false;

    alert = alert;
    updateReceiverModal: any;

    private skip: number;
    private take: number;

    isReceiversLoading$: Observable<boolean> = this._productService.isProductsLoading$;
    activeReceiver$: Observable<Product> = this._productService.activeProduct$;
    hasPreviousReceivers$: Observable<boolean> = this._productService.hasPreviousProducts$;
    hasMoreReceivers$: Observable<boolean> = this._productService.hasMoreProducts$;

    getConfirmationMessage(productName: string): string {
        return `${ this.message } ${ productName }?`;
    }

    constructor(
        private _productService: ProductService,
        private _modalService: NgbModal,
        private _notificationService: NotificationService,
        private _headerService: HeaderService,
        private _route: ActivatedRoute,
        private _router: Router
    ) { }

    ngOnInit() {
        this._headerService.setHeaderText(PAGE_TITLE);
        this._productService.doSearch();
    }

    removeProduct(product: Product) {
        console.log('remove product');
    }

    nextPage() {
        this._productService.nextPage();
    }

    previousPage() {
        this._productService.previousPage();
    }

    openUpdateReceiverModal(productId) {
        this._productService.setActiveProduct(productId);
        this._updateReceiverModalRef = this._modalService.open(this.updateProductRef, { size: MODAL_SIZE });
    }

    closeUpdateReceiverModal() {
        this._updateReceiverModalRef.close();
    }

    closeAddProductModal() {
        this._addReceiverModalRef.close();
    }

    addReceiver() {
        this._addReceiverModalRef = this._modalService.open(this.addProductRef, { size: MODAL_SIZE });
    }

    stopPropagation(event) {
        event.stopPropagation();
    }

}
