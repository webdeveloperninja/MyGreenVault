import { Component, OnInit, Input } from '@angular/core';
import { SideNavService } from '../../services/side-nav/side-nav.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'ti-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  @Input() isSideBarOpen: boolean; 

  isSideNavOpen$: Observable<boolean>;

  constructor(private _sideNavService: SideNavService) { }

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
