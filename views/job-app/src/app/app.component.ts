import { Component, OnInit } from '@angular/core';
import { SideNavService } from './shared/services/side-nav/side-nav.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isSideNavOpen$: Observable<boolean>;

  constructor(private _sideNavService: SideNavService) {}

  ngOnInit() {
    this.isSideNavOpen$ = this._sideNavService.isSideNavOpen$;
  }

}
