import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

import { myValidators } from '../validators';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public form!: FormGroup;
  public messageError: string = "";
  public message: string  = "";
  public loaded = true;
  public loading = false;
  public diameter!: number;
  public email!: AbstractControl | null;
  public password!: AbstractControl | null;
  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    if(window.innerWidth < 600){
      this.diameter = 220
    }else{
      this.diameter = 300
    }
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.maxLength(20)]]
    })
    this.email = this.form.get('email');
    this.password = this.form.get('password')
  }

  onSubmit(): void{
    if(this.form.valid){
      this.loaded = false;
      this.loading = true;
      const body = {
        identifier: this.email?.value,
        password: this.password?.value
      }
      this.authService.postLoginUser(body).then((response: boolean | Error) =>{
        console.log(response);
        this.message = "Bienvue vous êtes connecté(e)";
        this.messageError = "";
        this.loading = false;
        this.loaded = true; 
        setTimeout(() => {
          this.router.navigate(['/'])
        }, 2000);
      }).catch((message)=>{
        this.messageError = "Mot de passe incorrect"
        this.loading = false;
        this.loaded = true; 
      })
    }else{
      myValidators.forEachControlOfForm(this.form);
    }
  }

}
