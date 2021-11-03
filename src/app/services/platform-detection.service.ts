import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
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
    // console.log( this.mobileDetect.mobile() );          // 'Sony'
    // console.log( this.mobileDetect.phone() );           // 'Sony'
    // console.log( this.mobileDetect.tablet() );          // null
    // console.log( this.mobileDetect.userAgent() );       // 'Safari'
    // console.log( this.mobileDetect.os() );              // 'AndroidOS'
    // console.log( this.mobileDetect.is('iPhone') );      // false
    // console.log( this.mobileDetect.is('bot') );         // false
    // console.log( this.mobileDetect.version('Webkit') );         // 534.3
    // console.log( this.mobileDetect.versionStr('Build') );       // '4.1.A.0.562'
    // console.log( this.mobileDetect.match('playstation|xbox') );
    this.UserPlatform.next({ mobile: isMobile, os: os, email: email });
  }
}
