import { Route } from '@angular/compiler/src/core';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Router,
  RouterStateSnapshot,
  UrlSegment,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { CoreModule } from '../core/core.module';
import { MakeAlert, CheckYourMails } from '../shared/functions';
import { User } from '../shared/models/user.model';
import { PlatformDetector } from './platform-detection.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: CoreModule,
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(
    private userService: UserService,
    private router: Router,
    private detectPlatform: PlatformDetector
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    let isLoggedIn = false;
    this.userService.user$().subscribe((user: User | null) => {
      if (user && user.confirmed) {
        isLoggedIn = !!user;
      } else if (user && !user.confirmed) {
        isLoggedIn = false;
        MakeAlert('Vous devez valider votre compte', 'error', 2000).then(() => {
          CheckYourMails(this.detectPlatform.UserPlatform.value);
        });
      }
    });
    if (isLoggedIn) {
      return of(true);
    } else {
      return extractUserOfCookie();
    }
  }
  canLoad(route: Route, segment: UrlSegment[]): Observable<boolean> {
    let isLoggedIn = false;
    this.userService.user$().subscribe((user: User | null) => {
      if (user && user.confirmed) {
        isLoggedIn = !!user;
      } else if (user && !user.confirmed) {
        isLoggedIn = false;
        MakeAlert('Vous devez valider votre compte', 'error', 2000).then(() => {
          CheckYourMails(this.detectPlatform.UserPlatform.value);
        });
      }
    });
    if (isLoggedIn) {
      return of(true);
    } else {
      return extractUserOfCookie();
    }
  }
}
function extractUserOfCookie(): Observable<boolean> {
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
  if (allCookieInObject.authzm && allCookieInObject.iduserzm) {
    return of(true);
  } else {
    MakeAlert('Veuillez vous connectez', 'error', 1500).then(() => {
      window.location.assign('/connexion');
    });
    return of(false);
  }
}
