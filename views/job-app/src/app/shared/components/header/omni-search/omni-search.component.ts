import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'ti-omni-search',
  templateUrl: './omni-search.component.html',
  styleUrls: ['./omni-search.component.scss']
})
export class OmniSearchComponent implements OnInit {

    query: string = '';
    updatedCategory: string = '';

    @Input() category: string = ''; 
    @Input() defaultOperatorSkip;
    @Input() defaultOperatorTake;
    @Input() defaultToolSkip;
    @Input() defaultToolTake;
    @Input() defaultJobTake;
    @Input() defaultJobSkip;

    @Output() isSearch = new EventEmitter<any>();


    constructor() { }

    ngOnInit() {
    }

    searchTypeClass(route: string): string {
        this.updatedCategory = route;
        return (route === this.category) ? 'active' : '';
    }

    doSearch(): void {
        console.log(this.query);
        this.isSearch.emit(
            {
                query: this.query,
                category: this.updatedCategory
            });
        console.log('do search');
    }

}