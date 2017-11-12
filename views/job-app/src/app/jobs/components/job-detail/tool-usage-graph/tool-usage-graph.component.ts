import {
    Component,
    OnInit,
    Input
} from '@angular/core';

const single = [{
        "name": "Germany",
        "value": 8940000
    },
    {
        "name": "USA",
        "value": 5000000
    },
    {
        "name": "France",
        "value": 7200000
    },
    {
        "name": "oisdafjosdfaij",
        "value": 8940000
    },
    {
        "name": "oafdsijsdofij",
        "value": 5000000
    },
    {
        "name": "France",
        "value": 7200000
    },
    {
        "name": "Germany",
        "value": 8940000
    },
    {
        "name": "USA",
        "value": 5000000
    },
    {
        "name": "France",
        "value": 7200000
    }
];

@Component({
    selector: 'ti-tool-usage-graph',
    templateUrl: './tool-usage-graph.component.html',
    styleUrls: ['./tool-usage-graph.component.scss']
})
export class ToolUsageGraphComponent implements OnInit {

    single: any[];
    multi: any[];

    view: any[] = [600, 400];

    // options
    showXAxis = true;
    showYAxis = true;
    gradient = false;
    showLegend = true;
    showXAxisLabel = true;
    xAxisLabel = 'Tooling Cost Per Tool';
    showYAxisLabel = true;
    yAxisLabel = 'Cost';

    colorScheme = {
        domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
    };

    private _checkouts: any;

    @Input('checkouts')
    set checkouts(checkouts: any) {

        if (!!checkouts) {
            let updatedCheckouts = checkouts.reduce((checkoutData, checkout) => {
                const toolName = checkout.tool.toolName;
                const toolIndex = getIndex(checkoutData, toolName);
                const checkoutCost = Number(checkout.tool.toolCost) * Number(checkout.toolQty);

                if (toolIndex === -1) {
                    checkoutData.push({
                        "name" : toolName,
                        "value": checkoutCost
                    });
                } else {
                    checkoutData[toolIndex].value = checkoutData[toolIndex].value + checkoutCost;
                }

                return checkoutData;
            }, []);
            console.log('updated checkouts', updatedCheckouts);
            this._checkouts = updatedCheckouts;
        
        }
    }

    get checkouts() {
        return this._checkouts;
    }



    checkoutData: any;

    private createGraphData() {
        if (this.checkouts) {

            this.checkoutData = this.checkouts.reduce((chartData, checkout) => {
                if (!chartData.labels.includes(checkout.toolName)) {
                    chartData.labels.push(checkout.toolName);
                    chartData.data.push(checkout.toolCheckoutQty);
                } else {
                    let labelIndex = chartData.labels.indexOf(checkout.toolName);
                    if (chartData.data[labelIndex]) {
                        chartData.data[labelIndex] = Number(chartData.data[labelIndex]) + Number(checkout.toolCheckoutQty);
                    }
                }
                return chartData;
            }, {
                labels: [],
                data: []
            });
        }
    }

    // Doughnut
    public doughnutChartLabels: string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
    public doughnutChartData: number[] = [350, 450, 100];
    public doughnutChartType: string = 'doughnut';

    // events
    public chartClicked(e: any): void {
        console.log(e);
    }

    public chartHovered(e: any): void {
        console.log(e);
    }

    constructor() {
        Object.assign(this, {
            single
        });
    }

    ngOnInit() {}



    onSelect(event) {
        console.log(event);
    }

}

function getIndex(arr, property) {
    return arr.map(function(e) { return e.name; }).indexOf(property);
};