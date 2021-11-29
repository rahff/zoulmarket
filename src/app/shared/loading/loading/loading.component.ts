import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationStart,
  RouteConfigLoadEnd,
  RouteConfigLoadStart,
  Router,
} from '@angular/router';
import { Subscription } from 'rxjs';
import { LoadingService } from 'src/app/services/loading.service';
import { PlatformDetector } from 'src/app/services/platform-detection.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css'],
})
export class LoadingComponent implements OnInit, OnDestroy {
  @Input() detectRoutingOnGoing = false;
  public diameter = 400;
  public subscription: Subscription = new Subscription()
  constructor(private router: Router, 
              public loadingService: LoadingService,
              private platformService: PlatformDetector) {}

  ngOnInit(): void {
    this.subscription.add(this.platformService.UserPlatform.subscribe((obj: any)=>{
      if(obj.mobile){
        this.diameter = 250;
      }
    }))
    if (this.detectRoutingOnGoing) {
      this.router.events.subscribe((event) => {
        if (
          event instanceof NavigationStart ||
          event instanceof RouteConfigLoadStart
        ) {
          this.loadingService.loadingOn();
        } else if (
          event instanceof NavigationEnd ||
          event instanceof NavigationCancel ||
          event instanceof RouteConfigLoadEnd
        ) {
          this.loadingService.loadingOff();
        }
      });
    }
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
