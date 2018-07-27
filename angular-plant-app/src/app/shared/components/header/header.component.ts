import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';

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
    private _router: Router,
    private _formBuilder: FormBuilder,
  ) {
    this.createForm();
  }

  createForm() {
    this.searchForm = this._formBuilder.group({
      search: ['', Validators.required]
    });
  }

  ngOnInit() {
    // set cat and buttons on init
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
}
