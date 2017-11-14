import { Component, OnInit } from '@angular/core';
import { HeaderService } from 'app/shared/services/header/header.service';
import { alert } from 'app/shared/components/alert/alert.component';

@Component({
    selector: 'ti-preference-container',
    templateUrl: './preference-container.component.html',
    styleUrls: ['./preference-container.component.scss']
})
export class PreferenceContainerComponent implements OnInit {
    alert = alert;
    constructor(
        private _headerService: HeaderService
    ) { }

    ngOnInit() {
        this._headerService.setHeaderText('Preferences')
    }

}
