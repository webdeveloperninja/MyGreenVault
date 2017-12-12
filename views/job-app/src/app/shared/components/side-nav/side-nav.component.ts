import { Component, OnInit, Input } from '@angular/core';
import { SideNavService } from '../../services/side-nav/side-nav.service';
import { Observable } from 'rxjs';
import { DEFAULT_SKIP as TOOL_DEFAULT_SKIP, DEFAULT_TAKE as TOOL_DEFAULT_TAKE } from 'app/products/services/product';
import { DEFAULT_SKIP as OPERATOR_DEFAULT_SKIP, DEFAULT_TAKE as OPERATOR_DEFAULT_TAKE } from 'app/employees/services/employees';

@Component({
    selector: 'ti-side-nav',
    templateUrl: './side-nav.component.html',
    styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
    @Input() isSideBarOpen: boolean;

    isSideNavOpen$: Observable<boolean>;

    defaultToolSkip: number = TOOL_DEFAULT_SKIP;
    defaultToolTake: number = TOOL_DEFAULT_TAKE;

    defaultOperatorSkip: number = OPERATOR_DEFAULT_SKIP;
    defaultOperatorTake: number = OPERATOR_DEFAULT_TAKE;

    constructor(private _sideNavService: SideNavService) { }

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
