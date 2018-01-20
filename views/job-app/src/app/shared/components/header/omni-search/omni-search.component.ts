import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, NavigationEnd, Event } from '@angular/router';
import { HeaderService } from 'app/shared/services/header/header.service';

@Component({
  selector: 'ti-omni-search',
  templateUrl: './omni-search.component.html',
  styleUrls: ['./omni-search.component.scss']
})
export class OmniSearchComponent implements OnInit {

    isActive(route): boolean {
        return this._router.isActive(route, false);
    }

    query: string = '';
    updatedCategory: string = '';

    category: string = ''; 

    @Input() defaultOperatorSkip;
    @Input() defaultOperatorTake;
    @Input() defaultToolSkip;
    @Input() defaultToolTake;
    @Input() defaultJobTake;
    @Input() defaultJobSkip;

    @Output() isSearch = new EventEmitter<any>();


    constructor(
        private readonly _router: Router,
        private readonly _route: ActivatedRoute,
        private readonly _headerService: HeaderService
    ) { }

    ngOnInit() {
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

    searchTypeClass(route: string): string {
        this.updatedCategory = route;
        return (route === this.category) ? 'active' : '';
    }

    doSearch(): void {
            const skip = 0;
            const take = 8;

            this._router.navigate([`/plants`], 
                { queryParams: 
                    { 
                        skip: skip, 
                        take: take,
                        query: this.query
                    }
                });

    }

    clearSearch() {
        this.query = '';
    }

}