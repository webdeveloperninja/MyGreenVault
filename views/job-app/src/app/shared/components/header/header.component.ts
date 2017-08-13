import { Component, OnInit, Input } from '@angular/core';
import { SideNavService } from '../../services/side-nav/side-nav.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'ti-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isSideNavOpen$: Observable<boolean>;
  @Input() isSideBarOpen: boolean; 


  constructor(
    private _sideNavService: SideNavService
  ) { }

  ngOnInit() {
    this.isSideNavOpen$ = this._sideNavService.isSideNavOpen$;
  }

  toggleSideBar() {
    if(this.isSideBarOpen) {
      this._sideNavService.shutSideNav();
    } else {
      this._sideNavService.openSideNav();
    }
  }

}
