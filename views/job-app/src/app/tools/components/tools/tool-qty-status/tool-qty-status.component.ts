import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ti-tool-qty-status',
  templateUrl: './tool-qty-status.component.html',
  styleUrls: ['./tool-qty-status.component.scss']
})
export class ToolQtyStatusComponent implements OnInit {
  @Input() toolQty;
  @Input() idealToolQty;
  
  
  constructor() { }

  ngOnInit() {
  }

}
