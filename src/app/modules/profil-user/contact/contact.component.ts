import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';
import { BodyMail, User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  
  public loading = false;
  public loaded = true;
  public messageError!: string
  public messageSuccess!: string
  public formContact!: FormGroup
  public diameter!: number;
  public user!: User;
  get message(){
    return this.formContact.get('message')
  }
  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private userService: UserService,
              private router: Router) { }

  ngOnInit(): void {
    this.userService.user$.subscribe((user)=>{
      if(user){
        this.user = user
      }else{
        throw new Error("no user");
      }
    })
    if(window.innerWidth < 600){
      this.diameter = 220
    }else{
      this.diameter = 300
    }
    this.initForm(this.user)
  }
  initForm(user: User ): void {
    this.formContact = this.fb.group({
      name: [user.name],
      firstname: [user.firstname],
      email: [user.email],
      message: ['', [Validators.required, this.validatorTextarea]]
    })
  }
  validatorTextarea(formControl: FormControl): {[s: string]: boolean} | null {
    const specialChars = /[^a-z A-Z0-9,;.= ç\r\n!?àéèôö'ëê/îïâ:@€$£#\-\)(]/;
    const value = formControl.value;
    if(value){
    if(value?.search(specialChars) !== -1){
      return {notValid: true}
    }else{
      return null;
    }
  }else{
    return null
  }
  }
  onSubmit(): void {

    if(this.formContact.valid){
      this.loaded = false
      this.loading = true;
      const body: BodyMail = {
        name: this.formContact.get('name')?.value,
        email: this.formContact.get('email')?.value,
        firstname: this.formContact.get('firstname')?.value,
        message: this.formContact.get('message')?.value,
        tel: this.user.tel
      }
      this.userService.postMessage(body).subscribe((res:{message: string, status: boolean})=>{
        if(res.status){
          this.messageSuccess = res.message
          this.loaded = true
          this.loading = false;
          setTimeout(() => {
            this.router.navigate(["/profil", this.user.id])
          }, 800);
        }else{
          this.messageError = res.message
          this.loaded = true
          this.loading = false;
        }
      })
    }
  }

}
