import { Component, OnInit, Input, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {Jsonp, URLSearchParams} from '@angular/http';


@Injectable()
export class WikipediaService {
  constructor(private _jsonp: Jsonp) {}

  search(term: string) {
    if (term === '') {
      return Observable.of([]);
    }

    let wikiUrl = '/api/v1/jobs/search';
    let params = new URLSearchParams();
    params.set('search', term);
    params.set('action', 'opensearch');
    params.set('format', 'json');
    params.set('callback', 'JSONP_CALLBACK');

    return this._jsonp
      .get(wikiUrl, {search: params})
      .map(response => <string[]> response.json()[1]);
  }
}


@Component({
  selector: 'ti-checkout-tool',
  templateUrl: './checkout-tool.component.html',
  styleUrls: ['./checkout-tool.component.scss'],
  providers: [WikipediaService]
})
export class CheckoutToolComponent implements OnInit {

  @Input() tool: any;

  model: any;
  searching = false;
  searchFailed = false;
  hideSearchingWhenUnsubscribed = new Observable(() => () => this.searching = false);

  search = (text$: Observable<string>) =>
    text$
      .debounceTime(300)
      .distinctUntilChanged()
      .do(() => this.searching = true)
      .switchMap(term =>
        this._service.search(term)
          .do(() => this.searchFailed = false)
          .catch(() => {
            this.searchFailed = true;
            return Observable.of([]);
          }))
      .do(() => this.searching = false)
      .merge(this.hideSearchingWhenUnsubscribed);

  constructor(private _service: WikipediaService) {}

  ngOnInit() {
  }

}
