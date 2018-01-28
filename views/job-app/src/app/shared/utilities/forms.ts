import { FormGroup } from '@angular/forms';

export const markAsTouched = (formGroup: FormGroup) => {
    Object.keys(formGroup.controls).forEach(key => {
        formGroup.get(key).markAsTouched();
    });
};