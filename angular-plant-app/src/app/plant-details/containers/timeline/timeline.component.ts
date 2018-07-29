import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromDetails from '../../reducers/plant-details.reducer';
import * as fromDetailsActions from '../../actions/details.actions';
import * as fromDetailsSelectors from '../../selectors/details';

@Component({
  selector: 'vault-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {
  @Input() weeks: any[];

  selectedWeek$ = this._store.select(fromDetailsSelectors.getSelectedWeek);
  constructor(private _store: Store<fromDetails.State>) {}

  ngOnInit() {}

  selectWeek(week) {
    this._store.dispatch(new fromDetailsActions.SelectPlantWeek(week._id));
  }
}
