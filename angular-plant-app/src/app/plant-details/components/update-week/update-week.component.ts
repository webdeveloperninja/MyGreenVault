import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromDetails from '../../reducers/plant-details.reducer';
import * as fromDetailsActions from '../../actions/details.actions';
import { Actions, ofType } from '@ngrx/effects';
import { NotificationService } from 'app/shared/services/notification/notification.service';
import * as moment from 'moment';

@Component({
  selector: 'vault-update-week',
  templateUrl: './update-week.component.html',
  styleUrls: ['./update-week.component.scss']
})
export class UpdateWeekComponent implements OnInit, OnChanges {
  @Input() weekId: string;
  @Input() week: any;
  weekFormGroup: FormGroup;
  startDate: moment.Moment;
  endDate: moment.Moment;

  constructor(
    private _formBuilder: FormBuilder,
    private _store: Store<fromDetails.State>,
    private actions$: Actions,
    private readonly notifiactionService: NotificationService
  ) {
    this.createForm();
  }

  createForm() {
    this.weekFormGroup = this._formBuilder.group({
      height: [''],
      lightSchedule: [''],
      dayAirTemperature: [''],
      nightAirTemperature: [''],
      ph: [''],
      airHumidity: [''],
      smell: [''],
      soilTemperature: [''],
      lampToPlantDistance: ['']
    });
  }

  addWeek() {
    this._store.dispatch(new fromDetailsActions.UpdateWeek({ weekId: this.weekId, week: this.weekFormGroup.value }));
  }

  ngOnInit() {
    this.actions$.pipe(ofType<fromDetailsActions.WeekUpdated>(fromDetailsActions.ActionTypes.WeekUpdated)).subscribe(updated => {
      this.notifiactionService.setNotificationOn('Updated plant');
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    this.weekFormGroup.reset();
    if (!!changes && !!changes.week) {
      console.log('changes', changes.week.currentValue);
      const week = changes.week.currentValue;
      if (!!week && week.height) {
        this.weekFormGroup.controls.height.setValue(week.height);
      }
      if (!!week && week.lightSchedule) {
        this.weekFormGroup.controls.lightSchedule.setValue(week.lightSchedule);
      }
      if (!!week && week.dayAirTemperature) {
        this.weekFormGroup.controls.dayAirTemperature.setValue(week.dayAirTemperature);
      }
      if (!!week && week.nightAirTemperature) {
        this.weekFormGroup.controls.nightAirTemperature.setValue(week.nightAirTemperature);
      }
      if (!!week && week.ph) {
        this.weekFormGroup.controls.ph.setValue(week.ph);
      }
      if (!!week && week.airHumidity) {
        this.weekFormGroup.controls.airHumidity.setValue(week.airHumidity);
      }
      if (!!week && week.smell) {
        this.weekFormGroup.controls.smell.setValue(week.smell);
      }
      if (!!week && week.soilTemperature) {
        this.weekFormGroup.controls.soilTemperature.setValue(week.soilTemperature);
      }
      if (!!week && week.lampToPlantDistance) {
        this.weekFormGroup.controls.lampToPlantDistance.setValue(week.lampToPlantDistance);
      }
    }
  }
}
