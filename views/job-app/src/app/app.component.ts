import { Component, OnInit } from '@angular/core';
import { SideNavService } from './shared/services/side-nav/side-nav.service';
import { Observable } from 'rxjs';
import { HeaderService } from './shared/services/header/header.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isSideNavOpen$: Observable<boolean>;
  title: string = 'Dashboard';
  headerText$: Observable<string>;

  constructor(
    private _sideNavService: SideNavService,
    private _headerService: HeaderService) {}

  ngOnInit() {
    this.isSideNavOpen$ = this._sideNavService.isSideNavOpen$;
    this.headerText$ = this._headerService.headerText$;
  }

}
