import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MenuAsideService } from 'src/app/main/home/menu-aside.service';
import { CartService } from 'src/app/services/cart.service';
import { PlatformDetector } from 'src/app/services/platform-detection.service';
import { UserService } from 'src/app/services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-sub-nav',
  templateUrl: './sub-nav.component.html',
  styleUrls: ['./sub-nav.component.css']
})
export class SubNavComponent implements OnInit, OnDestroy {

  public mobile: boolean = false
  public userId: string | null = null;
  public cartLength: number = 0;
  public subscription: Subscription = new Subscription()
  constructor(private cartService: CartService,
              private asideMenu: MenuAsideService,
              private userService: UserService,
              private platFormService: PlatformDetector) { }

  ngOnInit(): void {
    this.subscription.add(this.platFormService.getPlatform().subscribe((obj)=>{
      this.mobile = obj.mobile
    }))
    this.subscription.add(this.cartService.getCartLength().subscribe((length: number)=>{
      this.cartLength = length
    }))
    this.subscription.add(this.userService.user$().subscribe((user: User | null)=>{
      if(user){
        this.userId = user.id
      }else{
       this.userId = null
      }
    }))
  }
  toggleMenu(ev: Event): void {
    this.asideMenu.toggleMenuAside(ev)
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
