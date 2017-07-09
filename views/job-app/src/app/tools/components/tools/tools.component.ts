import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ToolsService, PagedList, Tool } from '../../services/tools';
import { Pipe, PipeTransform } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { NgbModal, NgbActiveModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NotificationService, DEFAULT_NOTIFICATION_TIME } from '../../../shared/services/notification/notification.service';

const REMOVE_TOOL_SUCCESS_MESSAGE: string = 'Successfully Removed Tool';
const MODAL_SIZE = 'lg';
const DEFAULT_TAKE: number = 8;

@Component({
  selector: 'ti-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.scss']
})
export class ToolsComponent implements OnInit {

  @ViewChild('updateToolRef') updateToolRef: ElementRef;
  @ViewChild('addToolRef') addToolRef: ElementRef;

  private _addToolModalRef: NgbModalRef;
  private _updateToolModalRef: NgbModalRef;

  updateToolModal: any;
  tools$: Observable<Tool[]>
  isToolsLoading$: Observable<boolean>;
  moreTools$: Observable<boolean>;
  toolsSkip$: Observable<number>;
  toolsTake$: Observable<number>;
  activeTool$: Observable<Tool>;

  constructor(
    private _toolsService: ToolsService,
    private _modalService: NgbModal,
    private _notificationService: NotificationService
  ) { }

  ngOnInit() {
    this.setInitialSubscriptions();
    this.doSearch();
  }

  nextPage() {
    this._toolsService.nextPage();
  }

  previousPage() {
    this._toolsService.previousPage();
  }

  doSearch() {
    this._toolsService.getTools().subscribe(response => {});
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
    });
  }

  setInitialSubscriptions() {
    this.tools$ = this._toolsService.tools$;
    this.isToolsLoading$ = this._toolsService.istoolsLoading$;
    this.activeTool$ = this._toolsService.activetool$;
    this.moreTools$ = this._toolsService.moreTools$;
    this.toolsSkip$ = this._toolsService.toolsSkip$;
    this.toolsTake$ = this._toolsService.toolsTake$;
  }

}
