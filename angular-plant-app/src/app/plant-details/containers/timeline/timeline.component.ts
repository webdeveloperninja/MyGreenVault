import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromDetails from '../../reducers/plant-details.reducer';
import * as fromDetailsActions from '../../actions/details.actions';
import * as fromDetailsSelectors from '../../selectors/details';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'vault-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {
  @Input() weeks: any[];
  @Input() events: any[];

  selected: string;

  showTimeline = true;

  selectedWeek$ = this._store.select(fromDetailsSelectors.getSelectedWeek).pipe(
    tap(selected => {
      this.selected = selected;
    })
  );
  constructor(private _store: Store<fromDetails.State>) {}

  ngOnInit() {}

  selectWeek(week) {
    this.showTimeline = true;
    this._store.dispatch(new fromDetailsActions.SelectPlantWeek(week._id));
  }

  showDeviceDashboard() {
    this.showTimeline = false;
  }
}
