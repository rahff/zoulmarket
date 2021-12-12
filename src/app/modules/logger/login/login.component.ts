import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { PlatformDetector } from 'src/app/services/platform-detection.service';
import { User } from 'src/app/shared/models/user.model';
import { environment } from 'src/environments/environment';
import { myValidators } from '../../../shared/functions';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  public emailFromCookie!: string;
  public form!: FormGroup;
  public subscription: Subscription = new Subscription()
  public messageError: string = '';
  public message: string = '';
  public loaded = true;
  public loading = false;
  public userAgent!: {mobile: boolean, os: string, email: string | undefined};
  public diameter!: number;
  public email!: AbstractControl | null;
  public password!: AbstractControl | null;
  private redirectOnCart: boolean = false;
  public URL_API_FORGOT_PASSWORD = environment.URL_API_FORGOT_PASSWORD
  private expirationCookieAuth = new Date().getTime() + 7 * 24 * 60 * 60 * 1000;
  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private mobileDetect: PlatformDetector,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.subscription.add(this.mobileDetect.UserPlatform.subscribe((obj:{mobile: boolean, os: string, email: string | undefined})=>{
      this.userAgent = obj;    
    }))
    this.activatedRoute.queryParamMap.subscribe((param: ParamMap) => {
      if (param.get('origin')) {
        this.redirectOnCart = true;
      } else {
        this.redirectOnCart = false;
      }
    });
    if (window.innerWidth < 600) {
      this.diameter = 220;
    } else {
      this.diameter = 300;
    }
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.maxLength(20)]],
    });
    this.email = this.form.get('email');
    this.password = this.form.get('password');
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.loaded = false;
      this.loading = true;
      const body = {
        identifier: this.email?.value,
        password: this.password?.value,
      };
      this.authService
        .postLoginUser(body).subscribe((response: { user: User | null; token: string | null }) => {
          console.log("aa",response);
          this.loading = false;
          this.loaded = true;
            console.log((response.user));
            document.cookie = `iduserzm=${JSON.stringify(
              response.user?.id
            )};expires=${JSON.stringify(this.expirationCookieAuth)}`;
            document.cookie = `authzm=${JSON.stringify(response.token)};expires=${
              this.expirationCookieAuth
            }`;
            document.cookie = `user=${JSON.stringify(
              response.user
            )};expires=${JSON.stringify(this.expirationCookieAuth)}`;
          
            this.alertService.MakeAlert('Connection réussie','success')
          .then(()=>{
            if (!this.redirectOnCart) {
              this.router.navigate(['/']);
            } else {
              this.router.navigate(['/panier']);
            }
          })
        },(error)=>{
          this.loading = false;
          this.loaded = true;
          if(error.error.message[0].messages[0].message === "Identifier or password invalid."){
            this.alertService.MakeAlert("Vos indentifiants sont incorrect", 'error', 2000)
          }else{
            console.log("else");
            
            this.alertService.MakeAlert('Votre compte n\'a pas encore été validé', 'error', 3000).then(()=>{
              this.alertService.CheckYourMails(this.userAgent)
            })
          }
        },()=>{
          console.log("complete");
          
        })
    } else {
      myValidators.forEachControlOfForm(this.form);
    }
  }
  initResetPasswordProcess(): void {
   this.alertService.ShowInputAlert( this.URL_API_FORGOT_PASSWORD).then((result) => {
    if (result.isConfirmed) {
      this.alertService.MakeAlert('Vous allez reçevoir un email de résillation de mot de passe', "info")
    }
  });
}
ngOnDestroy(): void {
  this.subscription.unsubscribe()
}
}