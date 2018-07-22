import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, Event } from '@angular/router';
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

    defaultToolSkip: number = 0;
    defaultToolTake: number = 10;

    defaultOperatorSkip: number = 0;
    defaultOperatorTake: number = 10;

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

    doSearch(event) {
        if (event) {
            // const searchQuery = event.query;
            // const skip = 0;
            // const take = this._route.snapshot.queryParams["take"];
            // this._router.navigate([`/${event.category}`], 
            //     { queryParams: 
            //         { 
            //             skip: skip, 
            //             take: take,
            //             query: searchQuery
            //         }
            //     });
            // this.searchForm.patchValue({search: ''});
        }
    }

    toggleSideBar() {
        if (this.isSideBarOpen) {
            this._sideNavService.shutSideNav();
        } else {
            this._sideNavService.openSideNav();
        }
    }


}
