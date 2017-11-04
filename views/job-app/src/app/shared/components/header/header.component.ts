import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, Event } from '@angular/router';
import { SideNavService } from '../../services/side-nav/side-nav.service';
import { Observable } from 'rxjs';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { DEFAULT_SKIP as TOOL_DEFAULT_SKIP, DEFAULT_TAKE as TOOL_DEFAULT_TAKE } from '../../../tools/services/tools';
import { DEFAULT_SKIP as OPERATOR_DEFAULT_SKIP, DEFAULT_TAKE as OPERATOR_DEFAULT_TAKE } from '../../../operators/services/operators';
import { DEFAULT_SKIP as JOB_DEFAULT_SKIP, DEFAULT_TAKE as JOB_DEFAULT_TAKE } from '../../../jobs/services/jobs';

@Component({
  selector: 'ti-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    category: string = '';

    @Input() isSideBarOpen: boolean; 
    searchForm: FormGroup;

    defaultToolSkip: number = TOOL_DEFAULT_SKIP;
    defaultToolTake: number = TOOL_DEFAULT_TAKE;

    defaultOperatorSkip: number = OPERATOR_DEFAULT_SKIP;
    defaultOperatorTake: number = OPERATOR_DEFAULT_TAKE;

    defaultJobSkip: number = JOB_DEFAULT_SKIP;
    defaultJobTake: number = JOB_DEFAULT_TAKE;

    isSideNavOpen$: Observable<boolean>;

    constructor(
        private _sideNavService: SideNavService,
        private _router: Router,
        private _route: ActivatedRoute,
        private _formBuilder: FormBuilder,
        private _activatedRoute: ActivatedRoute) { 
            this.createForm();
        }

    createForm() {
        this.searchForm = this._formBuilder.group({
            search: ['', Validators.required]
        })
    }

    ngOnInit() {
        // set cat and buttons on init
        this.isSideNavOpen$ = this._sideNavService.isSideNavOpen$;
        this._router.events.filter(event => event instanceof NavigationEnd).subscribe(event => {
            let url = event as NavigationEnd;
          
            if (url.url.includes('operators')) {
                this.category = 'operators';
            } else if (url.url.includes('tools')) {
                this.category = 'tools';
            } else if (url.url.includes('jobs')) {
                this.category = 'jobs';
            } 

        });
    }

    doSearch() {
        console.log('working');
        const searchQuery = this.searchForm.controls['search'].value;
        const skip = 0;
        const take = this._route.snapshot.queryParams["take"];
        this._router.navigate([`/${this.category}`], 
            { queryParams: 
                { 
                    skip: skip, 
                    take: take,
                    query: searchQuery
                }
            });
        this.searchForm.patchValue({search: ''});
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

    // setSearchCategory(route: string): void {
    //     console.log('route', route);
    //     this.category = route;
    // }
}
