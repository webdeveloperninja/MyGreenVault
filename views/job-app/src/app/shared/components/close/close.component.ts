import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

@Component({
    selector: 'vault-close',
    templateUrl: './close.component.html',
    styleUrls: ['./close.component.scss']
})
export class CloseComponent {
    @Input() isClosed: boolean;
    @Output() isClosedChange = new EventEmitter<boolean>();

    close(): void {
        this.isClosed = true;
        this.isClosedChange.emit(this.isClosed);
    }
}
