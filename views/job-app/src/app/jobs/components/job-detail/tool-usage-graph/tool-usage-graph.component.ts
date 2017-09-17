import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ti-tool-usage-graph',
  templateUrl: './tool-usage-graph.component.html',
  styleUrls: ['./tool-usage-graph.component.scss']
})
export class ToolUsageGraphComponent implements OnInit {
  private _checkouts: any;
  get checkouts(): any {
    return this._checkouts;
  }

  @Input('checkouts')
  set checkouts(value: any) {
    if (value) {
      console.log('inside graph component', value);
      this._checkouts = value;
      this.createGraphData();
    }

  }

  checkoutData: any;

  private createGraphData()  {
     if (this.checkouts) {
      this.checkoutData = this.checkouts.reduce((chartData, checkout) => {  
        if (!chartData.labels.includes(checkout.toolName)) {
          chartData.labels.push(checkout.toolName);
        }

        let labelIndex = chartData.labels.indexOf(checkout.toolName);
        if (chartData.data[labelIndex]) {
          chartData.data[labelIndex] += checkout.toolCheckoutQty;
        } 
        chartData.data[labelIndex] = checkout.toolCheckoutQty;
        return chartData;
      }, {
        labels: [],
        data: []
      });
      console.log(this.checkoutData);
    }
  }
  // Doughnut
  public doughnutChartLabels:string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  public doughnutChartData:number[] = [350, 450, 100];
  public doughnutChartType:string = 'doughnut';
 
  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }

  constructor() { }

  ngOnInit() {
  }

  isCheckoutDataValid() {
    if (this.checkoutData && this.checkoutData.labels.length != 0 && this.checkoutData.data.length != 0) {
      return true;
    }
    return false;
  }

  isCheckoutEmptyAndNotLoading() {
    if (this.checkoutData && this.checkoutData.data.length == 0) {
      return true;
    }
    return false;
  }

}
