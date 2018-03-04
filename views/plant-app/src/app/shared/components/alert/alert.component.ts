import { Component, OnInit, Input } from '@angular/core';

export enum alert {
    info = 0,
    warning = 1,
    success = 2,
    danger = 3
}

@Component({
    selector: 'ti-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

    alert = alert;

    @Input() status: alert;
    @Input() message: string;
    @Input() isLoading: boolean = false;
    @Input() showAlert: boolean = false;

    constructor() { }

    ngOnInit() {
    }

}
