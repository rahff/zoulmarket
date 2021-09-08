import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User, NewUser, UserLog } from '../shared/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private URL_API_REGISTER = environment.URL_API + 'auth/local/register';
  private URL_API_LOGIN = environment.URL_API + 'auth/local';
  private URL_API_GOOGLE = environment.URL_API + 'connect/google';
  private URL_API = environment.URL_API;
  private expirationCookieAuth = new Date().getTime() + 7 * 24 * 60 * 60 * 1000;
  public jwtToken: string | null | undefined = null;
  public user$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(
    null
  );
  private subScription: Subscription = new Subscription();
  private http!: HttpClient;
  private idOfCurrentUser: string | null = null;
  constructor(private httpBackend: HttpBackend) {
    this.http = new HttpClient(httpBackend);
    this.getTokenAndIdUserFromCookies();
    if (this.jwtToken && this.idOfCurrentUser) {
      this.getUserInfo(this.idOfCurrentUser).subscribe();
    }
  }

  postCredentialsNewUser(body: NewUser): Promise<boolean | string> {
    return new Promise((resolve, reject) => {
      this.http.post(this.URL_API_REGISTER, body).subscribe((response: any) => {
        if (response.jwt) {
          this.jwtToken = response.jwt;
          document.cookie = `authzm=${this.jwtToken}`;
          this.user$.next(response.user);
          document.cookie = `iduserzm=${response.user.id}`;
          resolve(true);
        } else {
          reject("Il y a eu un problème...Veuillez réessayer s'il vous palît");
        }
      });
    });
  }
  postLoginUser(body: UserLog): Promise<boolean | Error> {
    return new Promise((resolve, reject) => {
      this.http.post(this.URL_API_LOGIN, body).subscribe(
        (response: any) => {
          if (response.jwt) {
            this.jwtToken = response.jwt;
            this.user$.next(response.user);
            document.cookie = `iduserzm=${response.user.id}`;
            document.cookie = `authzm=${this.jwtToken}`;
            resolve(true);
          } else {
            reject('Vos indentifiants sont incorrect');
          }
        },
        (err: Error) => {
          if (err) {
            reject(err);
          }
        }
      );
    });
  }
  registerWithGoogle() {
    this.http.get(this.URL_API_GOOGLE).subscribe((response: any) => {});
  }
  getTokenFromParam(token: string | undefined | null): void {
    this.jwtToken = token;
    if (this.jwtToken) {
      document.cookie = `authzm=${this.jwtToken};expires=${this.expirationCookieAuth}`;
    }
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
    this.jwtToken = allCookieInObject.authzm;
    this.idOfCurrentUser = allCookieInObject.iduserzm;
  }
  getUserInfo(id: string | null): Observable<User | null> {
    if (id) {
      return this.http
        .get(this.URL_API + 'users/' + id, {
          headers: {
            authorization: `Bearer ${this.jwtToken}`,
          },
        })
        .pipe(
          tap((data: any) => {
            this.user$.next({
              adress: data.adress,
              city: data.city,
              confirmed: data.confirmed,
              email: data.email,
              firstname: data.firstname,
              id: data.id,
              name: data.name,
              poste: data.poste,
              role: data.role,
              tel: data.tel,
            });
          }),
          catchError(() => {
            return of(null);
          })
        );
    }else{
      return of(null)
    }
  }
}
