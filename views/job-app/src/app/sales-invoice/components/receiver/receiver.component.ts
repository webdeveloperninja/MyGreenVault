import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'vault-receiver',
  templateUrl: './receiver.component.html',
  styleUrls: ['./receiver.component.scss']
})
export class ReceiverComponent {
    @Input() receiver: FormGroup;
    @Output() close = new EventEmitter<boolean>();

    closeForm(): void {
        this.close.emit(true);
    }
}
