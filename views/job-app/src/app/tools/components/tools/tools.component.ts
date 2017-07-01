import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ToolsService, IPagedList, Itool } from '../../services/tools';
import { SettingsService } from '../../services/settings';
import { SidebarService } from '../../services/sidebar';
import { Pipe, PipeTransform } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { NgbModal, NgbActiveModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';


const DEFAULT_TAKE: number = 8;

@Component({
  selector: 'ti-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.scss']
})
export class ToolsComponent implements OnInit {

  @ViewChild('updatetoolRef') updatetoolRef: ElementRef;
  @ViewChild('addtoolRef') addtoolRef: ElementRef;

  private _addtoolModalRef: NgbModalRef;

  updatetoolModal: any;
  private _updatetoolModalRef: NgbModalRef;

  tools$: Observable<Itool[]>
  istoolsLoading$: Observable<boolean>;

  activetool: Itool = null;
  activetoolSub$: Subscription;

  activetool$: Observable<Itool>;

  isLoading: boolean = false;

  loading: boolean = true;
  private _more: boolean;
  get more(): boolean {
    return this._more;
  }
  set more(val: boolean) {
    this._more = val;
  }

  private _skip: number = 0;
  set skip(val: number) {
    this._skip = val;
  }
  get skip(): number {
    return this._skip;
  }

  private _take: number = DEFAULT_TAKE;
  set take(val: number) {
    this._take = val;
  }
  get take(): number {
    return this._take;
  }

  constructor(
    private _toolsService: ToolsService,
    private _modalService: NgbModal
  ) { }

  ngOnInit() {
    this.tools$ = this._toolsService.tools$;
    this.istoolsLoading$ = this._toolsService.istoolsLoading$;
    this.activetool$ = this._toolsService.activetool$;

    this.doSearch();
  }

  displayOptions = {
    companyName: {
      selected: true
    },
    contactName: {
      selected: false
    },
    contactPhoneNumber: {
      selected: true
    },
    contactEmail: {
      selected: false
    },
    toolName: {
      selected: false
    },
    toolNumber: {
      selected: true
    },
    toolDescription: {
      selected: false
    },
    toolStatus: {
      selected: true
    }
  }

  nextPage() {
    this.skip = this.skip + this.take;
    this.doSearch();
  }

  previousPage() {
    if (this.skip >= this.take) {
      this.skip = this.skip - this.take;
      this.doSearch();
    }
  }

  doSearch() {
    this.isLoading = true;

    this._toolsService.gettools(this.skip, this.take).subscribe(response => {
      console.log(response);
      this.more = response.more
      this.isLoading = false;
      this.more = response.more;
      this.skip = response.skip;
      this.take = response.take;
    })
  }

  openUpdatetoolModal(toolId) {
    this._toolsService.setActivetool(toolId);
    this._updatetoolModalRef = this._modalService.open(this.updatetoolRef, { size: 'lg' });
  }

  closeUpdatetoolModal() {
    this._updatetoolModalRef.close();
  }

  closeAddtoolModal() {
    this._addtoolModalRef.close();
  }

  isTiUpdatetoolLoading(event) {
    console.log(event);
  }

  addtool() {
    this._addtoolModalRef = this._modalService.open(this.addtoolRef, { size: 'lg' });
  }

}
