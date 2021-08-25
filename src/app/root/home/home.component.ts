import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Category } from 'src/app/shared/models/category.model';
import { Product } from 'src/app/shared/models/product';
import { Store } from 'src/app/shared/models/store';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CategoryService } from 'src/app/shared/services/category.service';
import { ProductService } from 'src/app/shared/services/product.service';
import { StoreService } from 'src/app/shared/services/store.service';
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
    console.log(ev,'window');
    
    if(this.stateMenu === "open"){
      this.stateMenu = "close";
      this.overlay.nativeElement.style.display = "none";
    }else{
      return;
    }
  }
  public promo!:Product[];
  public stores!:Store[];
  public Promocategories!: Category[];
  public subscription: Subscription = new Subscription();
  public tokenParam: string | null | undefined = null
  constructor(private activatedRoute: ActivatedRoute, 
              private authService: AuthService,
              private ProductService: ProductService,
              private categoryService: CategoryService,
              private storesService: StoreService) { }

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe((queryparam: ParamMap)=>{
      if(queryparam.get("id_token")){
        this.tokenParam = queryparam.get("id_token")
        this.authService.getTokenFromParam(this.tokenParam);
      }
    })
    this.subscription.add(this.ProductService.getProductPromo().subscribe((data: Product[])=>{
      this.promo = data;
    }));
    this.subscription.add(this.categoryService.getSuggestionCategory().subscribe((data: Category[])=>{
      if(data){
        this.Promocategories = data
      }else{
        throw new Error("no data");
      }
    }))
    this.subscription.add(this.storesService.getStoresPromo().subscribe((data: Store[])=>{
      if(data){
        this.stores = data
      }else{
        throw new Error("no data");
      }
      
    }))
    
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
  }

}
