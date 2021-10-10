import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { myValidators } from 'src/app/modules/logger/validators';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-form-update-infos-user',
  templateUrl: './form-update-infos-user.component.html',
  styleUrls: ['./form-update-infos-user.component.css']
})
export class FormUpdateInfosUserComponent implements OnInit {

  public loaded: boolean = true;
  public loading: boolean = false;
  public message!: string;
  public messageError!: string;
  public subject: string | null = '';
  public diameter: number = 350;
  public form!: FormGroup;
  public typeOfControl!: string;
  public emptyField: boolean = false;
  get password(){
    if(this.form.get('password')){
      return this.form.get('password')
    }else{
      return null
    }
  }
  public notMatchingPassword: boolean = false;
  private userId!: string | null | undefined;
  public cities = ['Vesoul', 'Navenne', "Quincey","Noidans-lès-Vesoul", "Vaivre", "Coulevon"]
  constructor(private route: ActivatedRoute,
              private userService: UserService,
              private router: Router) { }

  ngOnInit(): void {
    if(window.innerWidth < 600){
      this.diameter = 200
    }
    this.subject = this.route.snapshot.data['subject']
    this.userId = this.route.parent?.snapshot.paramMap.get('userId');
    console.log(this.userId);
    
    this.typeOfControl = this.initTypeOfControl(this.subject)
    this.initForm();
  }
  initForm(): void {
    if(this.subject === "mot de passe"){
      this.form = new FormGroup({
        password: new FormControl("",[Validators.required, myValidators.validatorPassword()]),
        confirm: new FormControl("", [Validators.required])
      })
    }else if(this.subject === "email"){
      this.form = new FormGroup({
        email: new FormControl("",[Validators.required, Validators.email])
      })
    }else if (this.subject === "adresse"){
      this.form = new FormGroup({
        numero: new FormControl("",Validators.required),
        rue: new FormControl("", Validators.required),
        postal: new FormControl('', Validators.required),
        city: new FormControl('', Validators.required)
      })
    }else if(this.subject === "Nom"){
      this.form = new FormGroup({
        name: new FormControl('', Validators.required)
      })
    }else if(this.subject === "numéro de téléphone"){
      this.form = new FormGroup({
        tel: new FormControl('', Validators.required)
      })
    }
  }
  initTypeOfControl(subject: string | null): string {
    if(subject === "mot de passe"){
      return "password"
    }
    else if(subject === "email"){
      return "email";
    }else if(subject === "numéro de téléphone"){
      return "tel"
    }
    else{
      return 'texte'
    }
  }
  onSubmit(): void {
    if(this.password){
      this.notMatchingPassword = this.password.value === this.form.get('confirm')?.value ? false : true;
      if(this.notMatchingPassword){
        this.form.get('confirm')?.setErrors({notValid: true})
      }
    }
  if(this.form.valid){
    this.loaded = false;
    this.loading = true;
    const ref = Object.entries(this.form.controls)
    if(this.subject === "adresse"){
      let body: any = {
        adresse:{}
      }
      for (let i = 0; i < ref.length; i++) {
        body.adresse[ref[i][0]] = ref[i][1].value; 
      }
      this.userService.updateUserInfos(body,this.userId).subscribe((res)=>{
        this.loaded = true;
        this.loading = false;
        if(res.status){
          this.message = res.message
        }else{
          this.messageError = res.message
        }
        setTimeout(() => {
          this.router.navigate(["/profil","security", this.userId])
        }, 400);
      })
      
    }else{
      let body: any = {}
      for (let i = 0; i < ref.length; i++) {
          body[ref[i][0]] = ref[i][1].value
      }
      if(body.confirm){
        delete body.confirm
      }
      this.userService.updateUserInfos(body,this.userId).subscribe((res)=>{
        this.loaded = true;
        this.loading = false;
        if(res.status){
          this.message = res.message
        }else{
          this.messageError = res.message
        }
        setTimeout(() => {
          this.router.navigate(["/profil","security", this.userId])
        }, 400);
      })
    }
  }else{
    myValidators.forEachControlOfForm(this.form)
  }
}
}

