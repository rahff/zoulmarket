import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, first, map, take, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CoreModule } from '../core/core.module';
import { User, NewUser, UserLog, MailToUser } from '../shared/models/user.model';
import { UserService } from './user.service';

@Injectable({
  providedIn: CoreModule,
})
export class AuthService {
  private URL_API_REGISTER = environment.URL_API + 'auth/local/register';
  private URL_API_LOGIN = environment.URL_API + 'auth/local';
  private URL_API = environment.URL_API;
  private expirationCookieAuth = (new Date().getTime() + 7 * 24 * 60 * 60 * 1000);
  public jwtToken: string | null | undefined = null;

  private http!: HttpClient;
  private idOfCurrentUser: string | null = null;

  constructor(private httpBackend: HttpBackend,
              private userService: UserService) {
    this.http = new HttpClient(this.httpBackend);
    this.getTokenAndIdUserFromCookies();    
  }

  postCredentialsNewUser(body: NewUser): Observable<User | null> {
     return this.http.post(this.URL_API_REGISTER, body).pipe(
       map((response: any)=>{
         if(response.user){
           console.log("response backend",response);
          this.userService.subjectUser$.next(response.user);
          document.cookie = `iduserzm=${response.user.id}`;
          document.cookie = `user=${JSON.stringify(response.user)}`;
          return response.user
         }else {
           return null
         }
       }))
          
          
    
  
  }
  postLoginUser(body: UserLog):Observable<{user: User | null, token: string | null}> {
      return this.http.post(this.URL_API_LOGIN, body).pipe(
        map((response: any)=>{
        if (response.jwt) {        
          this.jwtToken = response.jwt;
          const user: User = {
            adresse: {
              rue: response.user.adresse.rue,
              city: response.user.adresse.city,
              postal: response.user.adresse.postal,
              numero: response.user.adresse.numero,
              name: response.user.name,
              firstname: response.user.firstname
            },
            confirmed: response.user.confirmed,
            email: response.user.email,
            firstname: response.user.firstname,
            id: response.user.id,
            name: response.user.name,
            role: response.user.role,
            tel: response.user.tel,
            orders: response.orders
          }
          this.userService.subjectUser$.next(user);
          document.cookie = `user=${JSON.stringify(user)};expires=${this.expirationCookieAuth}`;
            return { user: response.user, token: response.jwt}
        } else{
          return {user: null, token: null}
        }
      }))
  }
  getTokenAndIdUserFromCookies(): void {
    const allCookiesInArray: any[] = document.cookie.split(';');
    const allCookieInObject: any = {};
    if (allCookiesInArray) {
      allCookiesInArray.forEach((cookie: string) => {
        if (cookie) {
          const key = cookie.split('=')[0].trim();
          const value = cookie.split('=')[1].trim();
          allCookieInObject[key] = value;
        }
      });
    }
    if(allCookieInObject.authzm && allCookieInObject.iduserzm){
      this.jwtToken = allCookieInObject.authzm.split('"')[1];  
      this.idOfCurrentUser = allCookieInObject.iduserzm.split('"')[1];
    }
    if(this.jwtToken && this.idOfCurrentUser){
      this.getUserInfo(this.idOfCurrentUser).subscribe((user: User | null)=>{
        if(user){
          this.userService.subjectUser$.next(user)
        }
      })
    }
  }
  getUserInfo(id: string | null): Observable<User | null> {
    if (id) {
      return this.http
        .get(this.URL_API + 'users/' + id, {
          headers: new HttpHeaders({
            Authorization: `Bearer ${this.jwtToken}`
          })
        })
        .pipe(
          first(),
          map((data: any)=>{
            const user: User = {
              adresse:{
                postal: data.adresse.postal,
                city: data.adresse.city,
                numero:data.adresse.numero,
                rue: data.adresse.rue,
                name: data.name,
                firstname: data.firstname
            },
              confirmed: data.confirmed,
              email: data.email,
              firstname: data.firstname,
              id: data.id,
              name: data.name,
              role: data.role,
              tel: data.tel,
              orders: data.orders
            }
            document.cookie = `user=${JSON.stringify(user)};expires=${this.expirationCookieAuth}`;
            return user
          }),
          catchError(() => {
            console.log('prob');
            return of(null);
          })
        );
    }else{ 
      return of(null)
    }
  }
  expireAllCookies(name: string, paths: string[]) {
    const expires = new Date(0).toUTCString();
    // expire null-path cookies as well
    for (var i = 0, l = paths.length; i < l; i++) {
        document.cookie = name + '=; path=' + paths[i] + '; expires=' + expires;
    }
}
  logOut(): void {
    this.jwtToken = null;
    this.userService.subjectUser$.next(null);
    this.expireAllCookies('user', ['/', '/profil']);
    this.expireAllCookies('iduserzm', ['/', '/profil']);
    this.expireAllCookies('authzm', ['/', '/profil']);
  }
  resetPasswordProcess(body:any): Observable<boolean>{
    return this.http.post('http://localhost:1337/auth/reset-password', body).pipe(
      map((res: any)=>{
        console.log(res);
        return true
      })
    )
  }
  triggerConfirmationMail(userInfos: MailToUser): Observable<boolean>{
    
    return this.http.post(this.URL_API + "emailverification", userInfos.to).pipe(
      map((res: any)=>{
       console.log(res);
       return true
      })
    )
  }
}
