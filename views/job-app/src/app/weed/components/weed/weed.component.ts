import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { WeedService, PagedList, Tool } from '../../services/weed';
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
const PAGE_TITLE: string = 'Weed';

@Component({
    selector: 'ti-tools',
    templateUrl: './weed.component.html',
    styleUrls: ['./weed.component.scss']
})
export class WeedComponent implements OnInit {

    public title: string = 'Remove Tool';
    public message: string = 'Are you sure you want to remove tool: ';
    public confirmClicked: boolean = false;
    public cancelClicked: boolean = false;

    getConfirmationMessage(toolName: string): string {
        return `${this.message} ${toolName}?`;
    }

    hasTools: boolean = false;

    alert = alert;
    skip: number;
    take: number;

    @ViewChild('updateToolRef') updateToolRef: ElementRef;
    @ViewChild('addProductRef') addProductRef: ElementRef;

    private _addToolModalRef: NgbModalRef;
    private _updateToolModalRef: NgbModalRef;

    updateToolModal: any;
    tools$: Observable<Tool[]> = this._weedService.tools$.do(tools => {
        if (tools) {
            if (tools.length > 0) {
                this.hasTools = true;
            } else {
                this.hasTools = false;
            }
        } else {
            this.hasTools = false;
        }
    });

    isToolsLoading$: Observable<boolean> = this._weedService.istoolsLoading$;
    moreTools$: Observable<boolean> = this._weedService.moreTools$; 
    activeTool$: Observable<Tool> = this._weedService.activetool$;
    hasPreviousTools$: Observable<boolean> = this._weedService.hasPreviousTools$;


    constructor(
        private _weedService: WeedService,
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
        this._weedService.nextPage();
    }

    previousPage() {
        this._weedService.previousPage();
    }

    openUpdateToolModal(toolId) {
        this._weedService.setActivetool(toolId);
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
        this._weedService.removeTool(tool).first().subscribe(() => {
            this._notificationService.setNotificationOn(REMOVE_TOOL_SUCCESS_MESSAGE);
            this.tools$.first().subscribe(tools => {
                if ((tools.length - 1) == 0) {
                    this.previousPage();
                }
            });
        });
    }

}
