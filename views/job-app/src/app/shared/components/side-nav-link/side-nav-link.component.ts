import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ti-side-nav-link',
  templateUrl: './side-nav-link.component.html',
  styleUrls: ['./side-nav-link.component.scss']
})
export class SideNavLinkComponent implements OnInit {
  @Input() isSideBarOpen: boolean;
  @Input() linkText: string;
  @Input() linkPath: string;

  constructor() { }

  ngOnInit() {
  }

}
