import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, first, map, take, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User, NewUser, UserLog } from '../shared/models/user.model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
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

  postCredentialsNewUser(body: NewUser): Promise<boolean | string> {
    return new Promise((resolve, reject) => {
      this.http.post(this.URL_API_REGISTER, body).pipe(first()).subscribe((response: any) => {
        if (response.jwt) {
          this.jwtToken = response.jwt;
          document.cookie = `authzm=${this.jwtToken}`;
          this.userService.subjectUser$.next(response.user);
          document.cookie = `iduserzm=${response.user.id}`;
          document.cookie = `user=${response.user}`;
          resolve(true);
        } else {
          reject("Il y a eu un problème...Veuillez réessayer s'il vous palît");
        }
      });
    });
  }
  postLoginUser(body: UserLog): Promise<{user: User, token: string}> {
    return new Promise((resolve, reject) => {
      this.http.post(this.URL_API_LOGIN, body).pipe(first()).subscribe(
        (response: any) => {    
          if (response.jwt) {
            this.jwtToken = response.jwt;
            this.userService.subjectUser$.next({
              adress: {
                street: response.user.adresse.rue,
                city: response.user.adresse.city,
                postal: response.user.adresse.postal,
                numero: response.user.adresse.numero
              },
              confirmed: response.user.confirmed,
              email: response.user.email,
              firstname: response.user.firstname,
              id: response.user.id,
              name: response.user.name,
              role: response.user.role,
              tel: response.user.tel,
            });
            resolve({ user:{
              adress: {
                street: response.user.adresse.rue,
                city: response.user.adresse.city,
                postal: response.user.adresse.postal,
                numero: response.user.adresse.numero
              },
              confirmed: response.user.confirmed,
              email: response.user.email,
              firstname: response.user.firstname,
              id: response.user.id,
              name: response.user.name,
              role: response.user.role,
              tel: response.user.tel,
            },token: response.jwt});
          } else {
            reject("Vos indentifiants sont incorrects");
          }
        }
      );
    });
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
      this.getUserInfo(this.idOfCurrentUser).subscribe((res)=>{
        console.log(res);
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
          tap((data: any) => {
            this.userService.subjectUser$.next({
              adress:{
                street: data.adresse.rue,
                city: data.adresse.city,
                postal: data.adresse.postal,
                numero: data.adresse.numero
              },
              confirmed: data.confirmed,
              email: data.email,
              firstname: data.firstname,
              id: data.id,
              name: data.name,
              role: data.role,
              tel: data.tel,
            });
          }),
          map((data: any)=>{
            document.cookie = `user=${JSON.stringify({
              adress: {
                street: data.adresse.rue,
                city: data.adresse.city,
                postal: data.adresse.postal,
                numero: data.adresse.numero
              },
              confirmed: data.confirmed,
              email: data.email,
              firstname: data.firstname,
              id: data.id,
              name: data.name,
              role: data.role,
              tel: data.tel
            })};expires=${this.expirationCookieAuth}`;
            return {
              adress: {
                street: data.adresse.rue,
                city: data.adresse.city,
                postal: data.adresse.postal,
                numero: data.adresse.numero
              },
              confirmed: data.confirmed,
              email: data.email,
              firstname: data.firstname,
              id: data.id,
              name: data.name,
              role: data.role,
              tel: data.tel,
            }
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
  logOut(): void {
    this.userService.subjectUser$.next(null);
    document.cookie=`user=;expires=152`;
    document.cookie= `authzm=;expires=152}`;
    document.cookie= `iduserzm=;expires=152}`;
  }
}
