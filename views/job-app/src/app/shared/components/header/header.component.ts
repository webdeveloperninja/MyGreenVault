import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { SideNavService } from '../../services/side-nav/side-nav.service';
import { Observable } from 'rxjs';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SearchService } from '../../services/search/search.service';

@Component({
  selector: 'ti-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    @Input() isSideBarOpen: boolean; 
    searchForm: FormGroup;

    isSideNavOpen$: Observable<boolean>;

    constructor(
        private _sideNavService: SideNavService,
        private _router: Router,
        private _formBuilder: FormBuilder,
        private _searchService: SearchService ) { 
            this.createForm();
        }

    createForm() {
        this.searchForm = this._formBuilder.group({
            search: ['', Validators.required]
        })
    }

    ngOnInit() {
        this.isSideNavOpen$ = this._sideNavService.isSideNavOpen$;
    }

    doSearch() {
        console.log('working');
        console.log(this.searchForm.controls['search'].value);
        this._searchService.doSearch(this.searchForm.controls['search'].value, 'tools').subscribe(data => {
            
        });
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
