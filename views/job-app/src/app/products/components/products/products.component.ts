import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ProductService, PagedList, Tool } from '../../services/product';
import { Pipe, PipeTransform } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { NgbModal, NgbActiveModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NotificationService, DEFAULT_NOTIFICATION_TIME } from '../../../shared/services/notification/notification.service';
import { HeaderService } from 'app/shared/services/header/header.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { alert } from 'app/shared/components/alert/alert.component';

const REMOVE_TOOL_SUCCESS_MESSAGE: string = 'Successfully Removed Tool';
const MODAL_SIZE = 'lg';
const DEFAULT_TAKE: number = 10;
const PAGE_TITLE: string = 'Products';

@Component({
    selector: 'ti-tools',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

    public title: string = 'Remove Tool';
    public message: string = 'Are you sure you want to remove tool: ';
    public confirmClicked: boolean = false;
    public cancelClicked: boolean = false;

    getConfirmationMessage(toolName: string): string {
        return `${this.message} ${toolName}?`;
    }

    hasProducts: boolean = false;

    alert = alert;
    skip: number;
    take: number;

    @ViewChild('updateToolRef') updateToolRef: ElementRef;
    @ViewChild('addProductRef') addProductRef: ElementRef;

    private _addToolModalRef: NgbModalRef;
    private _updateToolModalRef: NgbModalRef;

    updateToolModal: any;
    tools$: Observable<Tool[]> = this._productService.tools$.do(tools => {
        if (tools) {
            if (tools.length > 0) {
                this.hasProducts = true;
            } else {
                this.hasProducts = false;
            }
        } else {
            this.hasProducts = false;
        }
    });

    isProductsLoading$: Observable<boolean> = this._productService.isProductsLoading$;
    moreTools$: Observable<boolean> = this._productService.moreTools$; 
    activeTool$: Observable<Tool> = this._productService.activetool$;
    hasPreviousTools$: Observable<boolean> = this._productService.hasPreviousTools$;


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
        window.scrollTo(0, 0);
    }


    nextPage() {
        this._productService.nextPage();
    }

    previousPage() {
        this._productService.previousPage();
    }

    openUpdateToolModal(toolId) {
        this._productService.setActivetool(toolId);
        this._updateToolModalRef = this._modalService.open(this.updateToolRef, { size: MODAL_SIZE });
    }

    closeUpdateToolModal() {
        this._updateToolModalRef.close();
    }

    closeAddProductModal() {
        this._addToolModalRef.close();
    }

    addTool() {
        this._addToolModalRef = this._modalService.open(this.addProductRef, { size: MODAL_SIZE });
    }

    removeTool(tool) {
        this._productService.removeTool(tool).first().subscribe(() => {
            this._notificationService.setNotificationOn(REMOVE_TOOL_SUCCESS_MESSAGE);
            this.tools$.first().subscribe(tools => {
                if ((tools.length - 1) == 0) {
                    this.previousPage();
                }
            });
        });
    }

}
