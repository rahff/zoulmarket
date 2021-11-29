import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import * as MobileDetect from 'mobile-detect';
@Injectable({
  providedIn: 'root',
})
export class PlatformDetector {
  public UserPlatform = new BehaviorSubject<{ mobile: boolean; os: string, email: string | undefined }>({
    mobile: false,
    os: 'unknow',
    email: undefined
  });
  private mobileDetect = new MobileDetect(navigator.userAgent, 600);
  getPlatform(): Observable<{ mobile: boolean; os: string, email: string | undefined }> {
    return this.UserPlatform.asObservable()
  }
  getOS() {
    let email;
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
    if(allCookieInObject.user){
     email = allCookieInObject.user.email
    }
    const isMobile = !!this.mobileDetect.phone();
    const os = this.mobileDetect.os();
    this.UserPlatform.next({ mobile: isMobile, os: os, email: email });
  }
}
