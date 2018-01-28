import { FormGroup } from '@angular/forms';

export const markAsDirty = (formGroup: FormGroup) => {
    Object.keys(formGroup.controls).forEach(key => {
        formGroup.get(key).markAsTouched();
    });
};