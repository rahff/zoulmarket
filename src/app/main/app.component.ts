
import { Component, OnInit } from '@angular/core';

import { AuthService } from '../services/auth.service';

import { PlatformDetector } from '../services/platform-detection.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'zoulMarket';
  constructor(private mobileDetect: PlatformDetector,
              private authService: AuthService){}


  ngOnInit(): void {
    this.authService.getTokenAndIdUserFromCookies();
    this.mobileDetect.getOS()
  }
}
