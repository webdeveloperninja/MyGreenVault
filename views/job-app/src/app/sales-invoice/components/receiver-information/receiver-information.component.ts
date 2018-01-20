import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'ti-receiver-information',
    templateUrl: './receiver-information.component.html',
    styleUrls: ['./receiver-information.component.scss']
})
export class ReceiverInformationComponent {
    @Input() receiverInformation: FormGroup;
    @Output() close = new EventEmitter<boolean>();

    closeForm(): void {
        this.close.emit(true);
    }
}
