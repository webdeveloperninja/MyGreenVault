import { Component, OnInit } from '@angular/core';
import { SideNavService } from './shared/services/side-nav/side-nav.service';
import { Observable } from 'rxjs/Observable';
import { HeaderService } from './shared/services/header/header.service';
import { Router, ActivatedRoute, Params, Event, NavigationEnd } from '@angular/router';
import { ConstructionService } from 'app/construction.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    isSideNavOpen$: Observable<boolean>;
    title: string = 'Dashboard';
    headerText$: Observable<string>;

    isUnderConstruction$ = this._constructionService.isUnderConstruction$;

    constructor(
        private _sideNavService: SideNavService,
        private _headerService: HeaderService,
        private _constructionService: ConstructionService,
        private _router: Router) {

    }

    clearHeader(): void {
        this._headerService.setHeaderText('------');
    }

    ngOnInit() {
        this.isSideNavOpen$ = this._sideNavService.isSideNavOpen$;
        this.headerText$ = this._headerService.headerText$;
    }

}
