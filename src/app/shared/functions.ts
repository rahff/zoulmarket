import {
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
  FormGroup,
} from '@angular/forms';




export const myValidators = {
  validatorPassword: (): ValidatorFn => {
    return (control: AbstractControl): ValidationErrors | null => {
      const reg = '^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$';
      const regexp = new RegExp(reg);
      return regexp.test(control.value) ? null : { error: true };
    };
  },
  validatorText: (): ValidatorFn => {
    return (control: AbstractControl): ValidationErrors | null => {
      const reg = '^[^<>%$#*µ§]*$';
      const regexp = new RegExp(reg);
      return regexp.test(control.value) ? null : { notValid: true };
    };
  },
  validatorTel: (): ValidatorFn => {
    return (control: AbstractControl): ValidationErrors | null => {
      const reg = '^(0|\\+33)[1-9]([-. ]?[0-9]{2}){4}$';
      const regexp = new RegExp(reg);
      return regexp.test(control.value) ? null : { notValid: true };
    };
  },
  forEachControlOfForm(form: FormGroup): void {
    const allControls = form.controls;
    for (const control in allControls) {
      if (allControls[control].invalid) {
        allControls[control].markAsTouched();
      }
    }
  },
};
