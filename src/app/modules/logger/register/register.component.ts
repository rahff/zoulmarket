import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { myValidators, MakeAlert } from '../../../shared/functions';

import { MailToUser, NewUser, User } from 'src/app/shared/models/user.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  public form!: FormGroup;
  public message: string = '';
  public cities = [
    'Vesoul',
    'Navenne',
    'Quincey',
    'Noidans-lès-Vesoul',
    'Vaivre',
    'Coulevon',
  ];
  public password!: AbstractControl | null;
  public confirm!: AbstractControl | null;
  public tel!: AbstractControl | null;
  public name!: AbstractControl | null;
  public firstname!: AbstractControl | null;
  public poste!: AbstractControl | null;
  public city!: AbstractControl | null;
  public email!: AbstractControl | null;
  public street!: AbstractControl | null;
  public numero!: AbstractControl | null;
  public loaded = true;
  public loading = false;
  public diameter!: number;
  private SMPT_HOSTNAME = environment.SMPT_HOSTNAME;
  private LINK_EMAIL_CONFIRMATION = environment.LINK_EMAIL_CONFIRMATION;
  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (window.innerWidth < 600) {
      this.diameter = 220;
    } else {
      this.diameter = 300;
    }
    this.form = this.fb.group({
      name: ['', [Validators.required, myValidators.validatorText()]],
      firstname: ['', [Validators.required, myValidators.validatorText()]],
      tel: [
        '+33',
        [
          Validators.required,
          ,
          Validators.minLength(10),
          myValidators.validatorTel(),
        ],
      ],
      street: ['', [Validators.required, myValidators.validatorText()]],
      numero: ['', [Validators.required, Validators.maxLength(6)]],
      poste: ['', [Validators.required, Validators.maxLength(5)]],
      city: ['', [Validators.required, myValidators.validatorText()]],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20),
          myValidators.validatorPassword(),
        ],
      ],
      confirm: [
        '',
        [Validators.required, Validators.minLength(6), this.validatorConfirm()],
      ],
    });
    this.password = this.form.get('password');
    this.confirm = this.form.get('confirm');
    this.tel = this.form.get('tel');
    this.name = this.form.get('name');
    this.firstname = this.form.get('firstname');
    this.poste = this.form.get('poste');
    this.city = this.form.get('city');
    this.email = this.form.get('email');
    this.street = this.form.get('street');
    this.numero = this.form.get('numero');
  }

  validatorConfirm(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return control.value === this.password?.value ? null : { noMatch: true };
    };
  }
  onSubmit(): void {
    if (this.form.valid) {
      this.loaded = false;
      this.loading = true;
      const body = this.makeBodyUser();
      this.authService.postCredentialsNewUser(body).subscribe(
        (response: User | null) => {
          if (response) {
            console.log('response in component');
            this.loading = true;
            this.loaded = false;
            MakeAlert('Votre compte à été crée avec succès', 'success').then(
              () => {
                MakeAlert(
                  'Un email vous a été envoyé pour confirmer la validation de votre compte',
                  'info',
                  3000
                ).then(() => {
                  this.router.navigate(['/']);
                });
              }
            );
            this.loading = false;
            this.loaded = true;
          }
        },
        (error: any) => {
          this.loading = false;
          this.loaded = true;
          MakeAlert(
            'Un compte a déjà été enresgistrer avec cet email',
            'error'
          );
        }
      );
    }else{
      return;
    }
    console.log("valid: ",this.form.valid);
    
  }

  makeMailOption(response: any): MailToUser {
    const mailOptions: MailToUser = {
      from: this.SMPT_HOSTNAME,
      url: this.LINK_EMAIL_CONFIRMATION,
      name: response.name,
      to: response.email,
      subject: 'validation de votre compte',
    };
    return mailOptions;
  }
  makeBodyUser(): NewUser {
    const body: NewUser = {
      name: this.name?.value,
      firstname: this.firstname?.value,
      email: this.email?.value,
      tel: this.tel?.value,
      adresse: {
        rue: this.street?.value,
        postal: this.poste?.value,
        city: this.city?.value,
        numero: this.numero?.value,
        name: this.name?.value,
        firstname: this.firstname?.value
      },
      confirmed: false,
      password: this.password?.value,
    };
    return body;
  }
}
