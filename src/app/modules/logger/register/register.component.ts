import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { myValidators } from '../validators';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public form!:FormGroup
  public message: string = ""
  private objValidPassword: any = {
    symbol: 0,
    lettre: 0,
    chiffre: 0
  };
  private testAll = 0;
  public password!: AbstractControl | null;
  public confirm!: AbstractControl | null;
  public tel!: AbstractControl | null;
  public loaded = true;
  public loading = false;
  public diameter!: number
  constructor(private authService: AuthService, private fb: FormBuilder) { }

  ngOnInit(): void {
    if(window.innerWidth < 600){
      this.diameter = 220
    }else{
      this.diameter = 300
    }
    this.form = this.fb.group({
      name: ["", [Validators.required, myValidators.validatorText()]],
      firstname: ["",[Validators.required, myValidators.validatorText()]],
      tel: ["+33", [Validators.required, , Validators.minLength(10), myValidators.validatorTel()]],
      adress: ['', [Validators.required, myValidators.validatorText()]],
      poste: ['', [Validators.required, Validators.maxLength(5)]],
      city: ['', [Validators.required, myValidators.validatorText()]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(20),myValidators.validatorPassword()]],
      confirm: ["", [Validators.required, Validators.minLength(6),this.validatorConfirm()]]
    })
    this.password = this.form.get('password');
    this.confirm = this.form.get('confirm');
    this.tel = this.form.get('tel');
  }
  validatorConfirm(): ValidatorFn{
  
    return (control: AbstractControl): ValidationErrors | null=>{
      return control.value === this.password?.value ? null : {noMatch: true}
    }
  }
    onSubmit(): void {
      console.log(this.password?.value);
      console.log(this.confirm);
      
    }

  }