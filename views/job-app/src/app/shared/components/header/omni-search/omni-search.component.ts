import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'ti-omni-search',
  templateUrl: './omni-search.component.html',
  styleUrls: ['./omni-search.component.scss']
})
export class OmniSearchComponent implements OnInit {

    @Input() category: string = ''; 

    constructor() { }

    ngOnInit() {
    }

    searchTypeClass(route: string): string {
        return (route === this.category) ? 'active' : '';
    }

    doSearch(): void {

    }

}
