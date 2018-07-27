import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'basic-info',
  templateUrl: './profit-loss.component.html'
})
export class ProfitLossComponent implements OnInit {
  plantId: string;

  constructor(private _route: ActivatedRoute) {}

  ngOnInit() {
    this.plantId = this._route.snapshot.paramMap.get('id');
  }
}
