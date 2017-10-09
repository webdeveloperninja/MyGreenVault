import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { SideNavService } from '../../services/side-nav/side-nav.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'ti-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    @Input() isSideBarOpen: boolean; 

    isSideNavOpen$: Observable<boolean>;

    constructor(
        private _sideNavService: SideNavService,
        private _router: Router ) { }

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

    searchTypeClass(route: string) {
        // TODO: parse route to determine active class for search type
        return 'active';
    }
}
