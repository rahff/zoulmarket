import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { CategoryService } from 'src/app/services/category.service';
import { UserService } from 'src/app/services/user.service';

import { Category } from 'src/app/shared/models/category.model';
import { Product } from 'src/app/shared/models/product';
import { Store } from 'src/app/shared/models/store';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('menu', [
      state('close', style('*')),
      state('open', style({
        transform: "translateX(0px)"
      })),
      transition('close <=> open', animate(250))
    ])
  ]
})
export class HomeComponent implements OnInit, OnDestroy {

  public stateMenu = "close";
  @ViewChild('overlay') public overlay!: ElementRef<HTMLDivElement>;
  @HostListener('window:click', ["$event"]) private closeMenu(ev: Event){
    ev.stopImmediatePropagation();
    if(this.stateMenu === "open"){
      this.stateMenu = "close";
      this.overlay.nativeElement.style.display = "none";
    }else{
      return;
    }
  }
  public mobile: boolean = false;
  public onScreen: boolean = false;
  public promo!:Product[];
  public userId: string | null = null;
  public categories: Category[] = [];
  public stores!:Store[];
  public Promocategories!: Category[];
  public subscription: Subscription = new Subscription();
  public tokenParam: string | null | undefined = null
  constructor(private activatedRoute: ActivatedRoute, 
              private authService: AuthService,
              private categoryService: CategoryService,
              private userService: UserService) { }

  ngOnInit(): void {
    if(window.innerWidth < 600){
      this.mobile = true;
      this.subscription.add(this.categoryService.getCategories().subscribe((data: Category[])=>{
        if(data){
          this.categories = data;
        }else{
          throw new Error("no data");
        }
      }))
      this.subscription.add(this.userService.user$.subscribe((user: User | null)=>{
        if(user){
          this.userId = user.id;
          console.log(user.id);
          
        }else{
          this.userId = null
        }
      }))
    }
    this.authService.getTokenAndIdUserFromCookies()
    this.onScreen = true;
    this.promo = this.activatedRoute.snapshot.data["products"];
    this.stores = this.activatedRoute.snapshot.data["stores"];
    this.Promocategories = this.activatedRoute.snapshot.data["categories"]
    
  }
  toggleMenu(ev: Event): void {
    ev.stopPropagation();
    if(this.stateMenu === "close"){
      this.stateMenu = "open";
      this.overlay.nativeElement.style.display = "block";
    }else{
      this.stateMenu = "close";
      this.overlay.nativeElement.style.display = "none";
    }
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.onScreen = false;
  }

}
