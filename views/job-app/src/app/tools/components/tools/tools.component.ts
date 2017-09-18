import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ToolsService, PagedList, Tool } from '../../services/tools';
import { Pipe, PipeTransform } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { NgbModal, NgbActiveModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NotificationService, DEFAULT_NOTIFICATION_TIME } from '../../../shared/services/notification/notification.service';
import { HeaderService } from '../../../shared/services/header/header.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

const REMOVE_TOOL_SUCCESS_MESSAGE: string = 'Successfully Removed Tool';
const MODAL_SIZE = 'lg';
const DEFAULT_TAKE: number = 10;
const PAGE_TITLE: string = 'Tools';

@Component({
  selector: 'ti-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.scss']
})
export class ToolsComponent implements OnInit {

  skip: number;
  take: number;

  @ViewChild('updateToolRef') updateToolRef: ElementRef;
  @ViewChild('addToolRef') addToolRef: ElementRef;

  private _addToolModalRef: NgbModalRef;
  private _updateToolModalRef: NgbModalRef;

  updateToolModal: any;
  tools$: Observable<Tool[]>
  isToolsLoading$: Observable<boolean>;
  moreTools$: Observable<boolean>;
  activeTool$: Observable<Tool>;

  constructor(
    private _toolsService: ToolsService,
    private _modalService: NgbModal,
    private _notificationService: NotificationService,
    private _headerService: HeaderService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    this.setInitialSubscriptions();
    this._headerService.setHeaderText(PAGE_TITLE);

    let skip = this._route.snapshot.queryParams["skip"];
    let take = this._route.snapshot.queryParams["take"];

    if (skip && take) {
      this.skip = Number(skip);
      this.take = Number(take);
    } else {
      this.skip = 0;
      this.take = DEFAULT_TAKE;
    }
    this.navigate();
  }

  navigate() {
    this._router.navigate([`/tools`], { queryParams: { skip: this.skip, take: this.take }});
    this.doSearch();
  }

  nextPage() {
    this.skip = this.skip + this.take;
    this.navigate();
  }

  previousPage() {
    if (this.skip >= this.take) {
      this.skip = this.skip - this.take;
      this.navigate();
    }
  }

  doSearch() {
    this._toolsService.getTools(this.skip, this.take).first().subscribe(response => {});
  }

  openUpdateToolModal(toolId) {
    this._toolsService.setActivetool(toolId);
    this._updateToolModalRef = this._modalService.open(this.updateToolRef, { size: MODAL_SIZE });
  }

  closeUpdateToolModal() {
    this._updateToolModalRef.close();
  }

  closeAddToolModal() {
    this._addToolModalRef.close();
  }

  addTool() {
    this._addToolModalRef = this._modalService.open(this.addToolRef, { size: MODAL_SIZE });
  }

  removeTool(tool) {
    this._toolsService.removeTool(tool).subscribe(() => {
      this._notificationService.setNotificationOn(REMOVE_TOOL_SUCCESS_MESSAGE);
      this.tools$.first().subscribe(tools => {
        if ((tools.length - 1) == 0) {
          this.previousPage();
        }
      });
    });
  }

  setInitialSubscriptions() {
    this.tools$ = this._toolsService.tools$;
    this.isToolsLoading$ = this._toolsService.istoolsLoading$;
    this.activeTool$ = this._toolsService.activetool$;
    this.moreTools$ = this._toolsService.moreTools$;
  }

}
