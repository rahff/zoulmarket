import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { StoreService } from 'src/app/services/store.service';
import { Category } from 'src/app/shared/models/category.model';
import { Product } from 'src/app/shared/models/product';
import { Store } from 'src/app/shared/models/store';

import { environment } from 'src/environments/environment';

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
  public onScreen: boolean = false;
  public promo!:Product[];
  public stores!:Store[];
  public Promocategories!: Category[];
  public subscription: Subscription = new Subscription();
  public tokenParam: string | null | undefined = null
  constructor(private activatedRoute: ActivatedRoute, 
              private authService: AuthService) { }

  ngOnInit(): void {
    this.onScreen = true;
    this. subscription = this.activatedRoute.queryParamMap.subscribe((queryparam: ParamMap)=>{
      if(queryparam.get("id_token")){
        this.tokenParam = queryparam.get("id_token")
        this.authService.getTokenFromParam(this.tokenParam);
      }
    })
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
