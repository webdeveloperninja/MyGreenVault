import { Component, OnInit, Input } from '@angular/core';
import { ToolsService } from '../../services/tools';
import { NotificationService } from '../../../shared/services/notification/notification.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'ti-add-tool-qty',
  templateUrl: './add-tool-qty.component.html',
  styleUrls: ['./add-tool-qty.component.scss']
})
export class AddToolQtyComponent implements OnInit {

  qtyToAdd: number;
  @Input() tool: any;

  constructor(
    private _toolsService: ToolsService,
    private _notificationService: NotificationService
  ) { }

  ngOnInit() {
  }

  saveQty() {
    console.log(this.tool);
    console.log(this.qtyToAdd);

    this.tool.qty += this.qtyToAdd;

    this._toolsService.updatetool(this.tool).subscribe(() => {
      this._notificationService.setNotificationOn('successfully added tools')
      this.qtyToAdd = null;
      Observable.timer(5000).subscribe(() => {
        this._notificationService.setNotificationOff()
      });
    })
  }

}
