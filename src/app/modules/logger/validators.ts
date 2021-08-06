import { ValidatorFn, AbstractControl, ValidationErrors } from "@angular/forms";


   export const myValidators = { 
       validatorPassword: (): ValidatorFn => {
        return (control: AbstractControl): ValidationErrors | null => {
          const reg = "^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$";
          const regexp = new RegExp(reg)
          return regexp.test(control.value) ? null : {error: true}
        }
        
      },
      validatorText: (): ValidatorFn => {
        return (control: AbstractControl): ValidationErrors | null =>{
          const reg = "^[^<>%$#*µ§]*$";
          const regexp = new RegExp(reg)
          return regexp.test(control.value) ? null : {notValid: true}
        }
      },
      validatorTel: (): ValidatorFn => {
        return (control: AbstractControl): ValidationErrors | null => {
          const reg = "(0|\\+33|0033)[1-9][0-9]{8}";
          const regexp = new RegExp(reg);
          return regexp.test(control.value) ? null : {notValid: true}
        }
      }
    }