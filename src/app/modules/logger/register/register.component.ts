import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { myValidators } from '../validators';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public form!:FormGroup
  public message: string = ""
  public cities = ['Vesoul', 'Navenne', "Quincey","Noidans-lès-Vesoul", "Vaivre", "Coulevon"]
  public password!: AbstractControl | null;
  public confirm!: AbstractControl | null;
  public tel!: AbstractControl | null;
  public name!: AbstractControl | null;
  public firstname!: AbstractControl | null;
  public poste!: AbstractControl | null;
  public city!: AbstractControl | null;
  public email!: AbstractControl | null;
  public adress!: AbstractControl | null;
  public loaded = true;
  public loading = false;
  public diameter!: number
  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router) { }

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
    this.name = this.form.get('name');
    this.firstname = this.form.get('firstname');
    this.poste = this.form.get('poste');
    this.city= this.form.get('city');
    this.email= this.form.get('email');
    this.adress= this.form.get('adress');
  }
  
  validatorConfirm(): ValidatorFn{
  
    return (control: AbstractControl): ValidationErrors | null=>{
      return control.value === this.password?.value ? null : {noMatch: true}
    }
  }
    onSubmit(): void {
      this.loaded = false;
      this.loading = true;
     if(this.form.valid){
       const body = {
         name: this.name?.value,
         firstname: this.firstname?.value,
         email: this.email?.value,
         tel: this.tel?.value,
         adress: this.adress?.value,
         poste: this.poste?.value,
         city: this.city?.value,
         password: this.password?.value,
       };
       this.authService.postCredentialsNewUser(body).then((response: boolean | string)=>{
          this.message = "Votre compte à été crée avec succès";
          this.loading = false;
          this.loaded = true;
          setTimeout(() => {
            this.router.navigate(['/'])
          }, 2000);
       }).catch((message: string)=>{
         this.message = message;
         this.loading = false;
       });
     }else{
      myValidators.forEachControlOfForm(this.form)
     }
      
    }
    signupGoogle(): void {
      this.authService.registerWithGoogle()
    }

  }