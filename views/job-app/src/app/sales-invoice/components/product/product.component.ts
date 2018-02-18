import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';

@Component({
  selector: 'vault-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  @Input() productForm: FormGroup;
  @Output() close = new EventEmitter<boolean>();

  closeForm(): void {
    this.close.emit(true);
  }

  isRequiredValidator(control: AbstractControl) {
    if (
      control &&
      control.touched &&
      control.invalid &&
      control.hasError('required')
    ) {
      return true;
    }
    return false;
  }
}
