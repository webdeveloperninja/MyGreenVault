import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ti-checkout-tool',
  templateUrl: './checkout-tool.component.html',
  styleUrls: ['./checkout-tool.component.scss']
})
export class CheckoutToolComponent implements OnInit {

  @Input() tool: any;

  constructor() { }

  ngOnInit() {
  }

}
