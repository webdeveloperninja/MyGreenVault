import { Component, OnInit, Input } from '@angular/core';
import { SideNavService } from '../../services/side-nav/side-nav.service';
import { Observable } from 'rxjs';
import { DEFAULT_SKIP, DEFAULT_TAKE } from '../../../tools/services/tools';

@Component({
  selector: 'ti-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  @Input() isSideBarOpen: boolean; 

  isSideNavOpen$: Observable<boolean>;

  defaultSkip: number = DEFAULT_SKIP;
  defaultTake: number = DEFAULT_TAKE;

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
