import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ti-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {

  private _isLoading: boolean = false;
  @Input('isLoading')
  set isLoading(isLoading: boolean) {
    this._isLoading = isLoading;
  }
  get isLoading(): boolean {
    return this._isLoading;
  }

  constructor() { }

  ngOnInit() {
  }

}
