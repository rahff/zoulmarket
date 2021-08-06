import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public form!: FormGroup;
  public messageError: string = "";
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
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.maxLength(20)]]
    })
  }
  onSubmit(): void{

  }

}
