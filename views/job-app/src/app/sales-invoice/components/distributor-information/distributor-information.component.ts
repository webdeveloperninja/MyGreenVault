import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'ti-distributor-information',
    templateUrl: './distributor-information.component.html',
    styleUrls: ['./distributor-information.component.scss']
})

export class DistributorInformationComponent {
    @Input() distributorInformation: FormGroup;
    @Output() close = new EventEmitter<boolean>();

    closeForm(): void {
        this.close.emit(true);
    }
}
