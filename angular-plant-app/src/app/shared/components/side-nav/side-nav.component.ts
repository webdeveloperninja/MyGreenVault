import { Component, OnInit, Input } from '@angular/core';
import { SideNavService } from '../../services/side-nav/side-nav.service';
import { Observable } from 'rxjs';
import { PlantsNavigationService } from '../../services/navigation.plants';

@Component({
    selector: 'ti-side-nav',
    templateUrl: './side-nav.component.html',
    styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
    @Input() isSideBarOpen: boolean;

    isSideNavOpen$: Observable<boolean>;

    defaultOperatorSkip: number = 0;
    defaultOperatorTake: number = 10;

    skip$ = this._plantsNavigationService.skip$;
    take$ = this._plantsNavigationService.take$;

    constructor(
        private _sideNavService: SideNavService,
        private _plantsNavigationService: PlantsNavigationService
    ) { }

    ngOnInit() {
        this.isSideNavOpen$ = this._sideNavService.isSideNavOpen$;
    }

    toggleSideBar() {
        if (this.isSideBarOpen) {
            this._sideNavService.shutSideNav();
        } else {
            this._sideNavService.openSideNav();
        }
    }

}
