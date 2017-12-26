import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../shared/services/header/header.service';

const PAGE_TITLE: string = 'Dashboard';

@Component({
    selector: 'ti-welcome',
    templateUrl: './welcome.component.html',
    styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

    constructor(
        private _headerService: HeaderService
    ) { }

    ngOnInit() {
        this._headerService.setHeaderText(PAGE_TITLE);
    }

}
