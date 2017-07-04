import { Component, OnInit, Input } from '@angular/core';
import { ToolsService } from '../../services/tools';

@Component({
  selector: 'ti-add-tool-qty',
  templateUrl: './add-tool-qty.component.html',
  styleUrls: ['./add-tool-qty.component.scss']
})
export class AddToolQtyComponent implements OnInit {

  qtyToAdd: number;
  @Input() tool: any;

  constructor(
    private _toolsService: ToolsService
  ) { }

  ngOnInit() {
  }

  saveQty() {
    console.log(this.tool);
    console.log(this.qtyToAdd);

    this.tool.qty += this.qtyToAdd;

    this._toolsService.updatetool(this.tool).subscribe(() => {
      console.log('successfully updated');
      this.qtyToAdd = null;
    })
  }

}
