import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NewUser, UserLog } from '../models/user.model';
import { SharedModule } from '../shared.module';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private URL_API_REGISTER = environment.URL_API + 'auth/local/register';
  private URL_API_LOGIN = environment.URL_API + 'auth/local';
  private URL_API_GOOGLE = environment.URL_API + 'connect/google';
  public jwtToken: string | null | undefined = null;
  private subScription: Subscription = new Subscription();
  constructor(private http: HttpClient) {}

  postCredentialsNewUser(body: NewUser): Promise<boolean | string> {
    return new Promise((resolve, reject) => {
      this.subScription.add(
        this.http
          .post(this.URL_API_REGISTER, body)
          .subscribe((response: any) => {
            if (response.jwt) {
              this.jwtToken = response.jwt;
              resolve(true);
            } else {
              reject('Il y a eu un problème...Veuillez réessayer s\'il vous palît');
            }
          })
      );
    });
  }
  postLoginUser(body:UserLog): Promise<boolean | Error> {
    return new Promise((resolve, reject)=>{
      this.http.post(this.URL_API_LOGIN, body).subscribe((response: any)=>{
        if(response.jwt){
          console.log(response);
          this.jwtToken = response.jwt;
          resolve(true)
        }else{
          reject('Vos indentifiants sont incorrect');
        }
      },(err:Error)=>{
        if(err){
          reject(err)
        }
      })
    })
  }
  registerWithGoogle(){
    this.http.get(this.URL_API_GOOGLE).subscribe((response: any)=>{
      console.log(response);
      
    })
  }
  getTokenFromParam(token: string | undefined | null): void {
    this.jwtToken = token
  }
}
