import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MakeAlert, myValidators } from 'src/app/shared/functions';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  public loading: boolean = false;
  public loaded: boolean = true;
  public form!: FormGroup;
  public code: string | null = "";
  public diameter: number = 500;
  constructor(private fb: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    if(window.innerWidth < 600){
      this.diameter = 200;
    }
    this.form = this.fb.group({
      password: ['', myValidators.validatorPassword ],
      confirm: ['', myValidators.validatorPassword ]
    })
    this.activatedRoute.queryParamMap.subscribe((queryParam: ParamMap)=>{
      if(queryParam.get('token')){
        this.code = queryParam.get('token');
      }
    })
  }
  onSubmit(): void {
    if(this.form.valid){
      const body = {
        password: this.form.get('password')?.value,
        passwordConfirmation: this.form.get('confirm')?.value,
        code: this.code
      }
      this.authService.resetPasswordProcess(body).subscribe((res: boolean)=>{
        MakeAlert('Votre motde passe à été modifié', "success", 2000).then(()=>{
          this.router.navigate(['/connexion'])
        })
      })
    }
  }
}
