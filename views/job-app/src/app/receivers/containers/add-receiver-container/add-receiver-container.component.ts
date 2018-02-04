import { Component, OnInit, OnDestroy } from '@angular/core';
import { HeaderService } from 'app/shared/services/header/header.service';

const pageTitle = 'Add Receiver';

@Component({
  selector: 'ti-add-receiver-container',
  templateUrl: './add-receiver-container.component.html',
})
export class AddReceiverContainerComponent implements OnInit, OnDestroy {

    constructor(private _headerService: HeaderService) { }

    ngOnInit() {
        this._headerService.setHeaderText(pageTitle);
    }

    ngOnDestroy() {
        this._headerService.removeHeaderText();
    }
}
