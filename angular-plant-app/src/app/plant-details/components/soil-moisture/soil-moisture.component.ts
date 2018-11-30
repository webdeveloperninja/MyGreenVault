import {Component, OnInit, Input, ChangeDetectorRef} from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'vault-soil-moisture',
  templateUrl: './soil-moisture.component.html',
  styleUrls: ['./soil-moisture.component.scss']
})
export class SoilMoistureComponent {
  showChart = true;
  moistureFilters: FormGroup;

  @Input() events;

  constructor(private readonly _formBuilder: FormBuilder, private readonly _changeDetectorRef: ChangeDetectorRef) {
    this.moistureFilters = _formBuilder.group({
      voltageFactor: [1],
      samplingRate: [1]
    });

    this.moistureFilters.controls.samplingRate.valueChanges.subscribe(() => {
      this.showChart = false;
      setTimeout(() => {
        this.showChart = true;
      })
    });
  }

  get lineChartData() {
    if (!this.events) {
      return;
    }
    return [
      {
        data: this.events
          .filter((_, index) => this.filterNthElement(index))
          .map(event => this.toVoltageFactor(event.IoTEvent.MoistureVoltage)),
        label: 'Soil Moisture'
      }
    ];
  }

  get lineChartLabels() {
    return this.events
      .filter((_, index) => this.filterNthElement(index))
      .map(event => event.IoTEvent.PublishedAt);
  }

  private filterNthElement(index: number): boolean {
    return index % this.moistureFilters.controls.samplingRate.value === 0;
  }

  private toVoltageFactor(voltage: number): number {
    return voltage * this.moistureFilters.controls.voltageFactor.value;
  }

  get hasEvents(): boolean {
    return this.events && this.events.length && this.events.length >= 1;
  }

  public lineChartOptions: any = {
    responsive: true
  };

  public lineChartLegend: boolean = false;
  public lineChartType: string = 'line';
}
