import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/models/user.model';

import { myValidators } from '../validators';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public emailFromCookie!: string;
  public form!: FormGroup;
  public messageError: string = "";
  public message: string  = "";
  public loaded = true;
  public loading = false;
  public diameter!: number;
  public email!: AbstractControl | null;
  public password!: AbstractControl | null;
  private redirectOnCart: boolean = false;
  private expirationCookieAuth = (new Date().getTime() + 7 * 24 * 60 * 60 * 1000);
  constructor(private authService: AuthService,
              private fb: FormBuilder,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private userServive: UserService
              ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe((param: ParamMap)=>{
      if(param.get('origin')){
        this.redirectOnCart = true;
      }else{
        this.redirectOnCart = false;
      }
    })
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
      this.authService.postLoginUser(body).then((response: {user: User, token: string}) =>{
        console.log(response);
        this.userServive.addTokenInUser(response.user.id, response.token)
        document.cookie = `iduserzm=${JSON.stringify(response.user.id)};expires=${JSON.stringify(this.expirationCookieAuth)}`;
            document.cookie = `authzm=${JSON.stringify(response.token)};expires=${this.expirationCookieAuth}`;
            document.cookie = `user=${JSON.stringify(response.user)};expires=${JSON.stringify(this.expirationCookieAuth)}`;
        this.message = "Bienvue vous êtes connecté(e)";
        this.messageError = "";
        this.loading = false;
        this.loaded = true; 
        setTimeout(() => {
          if(!this.redirectOnCart){
            this.router.navigate(['/'])
          }else{
            this.router.navigate(['/panier'])
          }
        }, 2000);
      }).catch((message)=>{
        this.messageError = message
        this.loading = false;
        this.loaded = true; 
      })
    }else{
      myValidators.forEachControlOfForm(this.form);
    }
  }
}
