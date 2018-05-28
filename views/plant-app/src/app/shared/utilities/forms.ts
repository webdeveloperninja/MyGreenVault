import { FormControl, FormGroup } from '@angular/forms';

export const markAsTouched = (formGroup: FormGroup) => {
  Object.keys(formGroup.controls).forEach(key => {
    formGroup.get(key).markAsTouched();
  });
};

export const markFormGroupTouched = (formGroup: FormGroup) => {
  if (formGroup.controls) {
    const keys = Object.keys(formGroup.controls);
    for (let i = 0; i < keys.length; i++) {
      const control = formGroup.controls[keys[i]];

      if (control instanceof FormControl) {
        control.markAsTouched();
      } else if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    }
  }
};

export const markFormGroupPristine = (formGroup: FormGroup) => {
  if (formGroup.controls) {
    const keys = Object.keys(formGroup.controls);
    for (let i = 0; i < keys.length; i++) {
      const control = formGroup.controls[keys[i]];

      if (control instanceof FormControl) {
        control.markAsPristine();
      } else if (control instanceof FormGroup) {
        this.markAsPristine(control);
      }
    }
  }
};
