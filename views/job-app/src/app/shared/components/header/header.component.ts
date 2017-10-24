import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SideNavService } from '../../services/side-nav/side-nav.service';
import { Observable } from 'rxjs';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'ti-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    category: string = '';

    @Input() isSideBarOpen: boolean; 
    searchForm: FormGroup;

    isSideNavOpen$: Observable<boolean>;

    constructor(
        private _sideNavService: SideNavService,
        private _router: Router,
        private _route: ActivatedRoute,
        private _formBuilder: FormBuilder) { 
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
        const searchQuery = this.searchForm.controls['search'].value;
        const skip = 0;
        const take = this._route.snapshot.queryParams["take"];
        this._router.navigate([`/tools`], 
            { queryParams: 
                { 
                    skip: skip, 
                    take: take,
                    category: this.category,
                    query: searchQuery
                }
            });
    }

    toggleSideBar() {
        if(this.isSideBarOpen) {
            this._sideNavService.shutSideNav();
        } else {
            this._sideNavService.openSideNav();
        }
    }

    searchTypeClass(route: string): string {
        // TODO: parse route to determine active class for search type
        return (route === this.category) ? 'active' : '';
    }

    setSearchCategory(route: string): void {
        this.category = route;
    }
}
