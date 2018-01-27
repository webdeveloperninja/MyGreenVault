import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'ti-omni-search',
  templateUrl: './omni-search.component.html',
  styleUrls: ['./omni-search.component.scss']
})
export class OmniSearchComponent {
    omniSearchForm: FormGroup;

    constructor(private _formBuilder: FormBuilder) { 
        this.omniSearchForm = this._formBuilder.group({
            'category': ['plants'],
            'search': ['']
        })
    }
}