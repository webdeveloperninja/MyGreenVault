import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SearchCategory } from '../../models/search-category.enum';
import { Router } from '@angular/router';

@Component({
  selector: 'ti-omni-search',
  templateUrl: './omni-search.component.html',
  styleUrls: ['./omni-search.component.scss']
})
export class OmniSearchComponent {
    SearchCategory = SearchCategory;
    omniSearchForm: FormGroup;

    constructor(private _formBuilder: FormBuilder, private _router: Router) {
        this.omniSearchForm = this._formBuilder.group({
            'category': [this.SearchCategory.plants],
            'search': ['']
        });
    }

    search() {
        this._router.navigate([this.omniSearchForm.controls.category.value.toLowerCase()],
            {queryParams: { skip: 0, take: 8, query: this.omniSearchForm.controls.search.value}});

        this.omniSearchForm.controls.search.reset();
    }
}