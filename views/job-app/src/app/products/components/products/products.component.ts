import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ProductService, PagedList, Tool } from '../../services/product';
import { Pipe, PipeTransform } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { NgbModal, NgbActiveModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NotificationService, DEFAULT_NOTIFICATION_TIME } from '../../../shared/services/notification/notification.service';
import { HeaderService } from 'app/shared/services/header/header.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { alert } from 'app/shared/components/alert/alert.component';
import { Product } from 'app/products/models/Product';

const REMOVE_TOOL_SUCCESS_MESSAGE: string = 'Successfully Removed Tool';
const MODAL_SIZE = 'lg';
const DEFAULT_TAKE: number = 10;
const PAGE_TITLE: string = 'Products';

@Component({
    selector: 'products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

    public title: string = 'Remove Product';
    public message: string = 'Are you sure you want to remove product: ';

    public confirmClicked: boolean = false;
    public cancelClicked: boolean = false;

    hasProducts: boolean = false;
    alert = alert;
    updateToolModal: any;

    private skip: number;
    private take: number;

    isProductsLoading$: Observable<boolean> = this._productService.isProductsLoading$;
    activeProduct$: Observable<Tool> = this._productService.activeProduct$;
    hasPreviousProducts$: Observable<boolean> = this._productService.hasPreviousProducts$;
    hasMoreProducts$: Observable<boolean> = this._productService.hasMoreProducts$;

    getConfirmationMessage(productName: string): string {
        return `${ this.message } ${ productName }?`;
    }

    @ViewChild('updateProductRef') updateProductRef: ElementRef;
    @ViewChild('addProductRef') addProductRef: ElementRef;

    private _addToolModalRef: NgbModalRef;
    private _updateToolModalRef: NgbModalRef;

    products$: Observable<Product[]> = this._productService.products$.do(products => {
        if (products) {
            if (products.length > 0) {
                this.hasProducts = true;
            } else {
                this.hasProducts = false;
            }
        } else {
            this.hasProducts = false;
        }
    });

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
        this._productService.doSearch()
    }

    removeProduct(product: Product) {
        this._productService.removeProduct(product).first().subscribe(() => {
            this._notificationService.setNotificationOn(REMOVE_TOOL_SUCCESS_MESSAGE);
            this.products$.first().subscribe(products => {
                if ((products.length - 1) == 0) {
                    this.previousPage();
                }
            });
        });
    }

    nextPage() {
        this._productService.nextPage();
    }

    previousPage() {
        this._productService.previousPage();
    }

    openUpdateToolModal(productId) {
        this._productService.setActiveProduct(productId);
        this._updateToolModalRef = this._modalService.open(this.updateProductRef, { size: MODAL_SIZE });
    }

    closeUpdateToolModal() {
        this._updateToolModalRef.close();
    }

    closeAddProductModal() {
        this._addToolModalRef.close();
    }

    addProduct() {
        this._addToolModalRef = this._modalService.open(this.addProductRef, { size: MODAL_SIZE });
    }

    removeTool(product: Product) {
        this._productService.removeProduct(product).first().subscribe(() => {
            this._notificationService.setNotificationOn(REMOVE_TOOL_SUCCESS_MESSAGE);
            this.products$.first().subscribe(products => {
                if ((products.length - 1) == 0) {
                    this.previousPage();
                }
            });
        });
    }

    stopPropagation(event) {
        event.stopPropagation();
    }

}
