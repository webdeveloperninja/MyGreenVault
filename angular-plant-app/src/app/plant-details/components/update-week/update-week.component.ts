import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromDetails from '../../reducers/plant-details.reducer';
import * as fromDetailsActions from '../../actions/details.actions';
import { Actions, ofType } from '@ngrx/effects';
import { NotificationService } from 'app/shared/services/notification/notification.service';

@Component({
  selector: 'vault-update-week',
  templateUrl: './update-week.component.html',
  styleUrls: ['./update-week.component.scss']
})
export class UpdateWeekComponent implements OnInit, OnChanges {
  isReadOnly = true;
  @Input() weekId: string;
  @Input() week: any;
  weekFormGroup: FormGroup;

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
      this.isReadOnly = true;
      this.notifiactionService.setNotificationOn('Updated plant');
    });
  }

  toggleReadOnly() {
    if (this.isReadOnly) {
      this.isReadOnly = false;
    } else {
      this.isReadOnly = true;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    this.weekFormGroup.reset();
    if (!!changes && !!changes.week) {
      console.log('changes');
      const week = changes.week.currentValue;
      if (week.height) {
        this.weekFormGroup.controls.height.setValue(week.height);
      }
      if (week.lightSchedule) {
        this.weekFormGroup.controls.lightSchedule.setValue(week.lightSchedule);
      }
      if (week.dayAirTemperature) {
        this.weekFormGroup.controls.dayAirTemperature.setValue(week.dayAirTemperature);
      }
      if (week.nightAirTemperature) {
        this.weekFormGroup.controls.nightAirTemperature.setValue(week.nightAirTemperature);
      }
      if (week.ph) {
        this.weekFormGroup.controls.ph.setValue(week.ph);
      }
      if (week.airHumidity) {
        this.weekFormGroup.controls.airHumidity.setValue(week.airHumidity);
      }
      if (week.smell) {
        this.weekFormGroup.controls.smell.setValue(week.smell);
      }
      if (week.soilTemperature) {
        this.weekFormGroup.controls.soilTemperature.setValue(week.soilTemperature);
      }
      if (week.lampToPlantDistance) {
        this.weekFormGroup.controls.lampToPlantDistance.setValue(week.lampToPlantDistance);
      }
    }
  }
}
