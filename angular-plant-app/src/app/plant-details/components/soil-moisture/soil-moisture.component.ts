import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'vault-soil-moisture',
  templateUrl: './soil-moisture.component.html',
  styleUrls: ['./soil-moisture.component.scss']
})
export class SoilMoistureComponent {
  @Input() events;
  // lineChart

  get lineChartData() {
    if (!this.events) {
      return;
    }

    return [
      {
        data: this.events.map(event => event.IoTEvent.MoistureVoltage),
        label: 'Soil Moisture'
      }
    ];
  }

  get lineChartLabels() {
    return this.events.map(event => event.IoTEvent.PublishedAt);
  }

  get hasEvents(): boolean {
    return this.events && this.events.length && this.events.length >= 1;
  }

  public lineChartOptions: any = {
    responsive: true
  };
  public lineChartColors: Array<any> = [
    {
      // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    {
      // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    {
      // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend: boolean = true;
  public lineChartType: string = 'line';

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }
}
