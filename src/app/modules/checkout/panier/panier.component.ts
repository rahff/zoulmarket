import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { ItemCart } from 'src/app/shared/models/item-cart.model';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/shared/models/user.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/shared/models/product';
import { Observable, Subscription } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';
import { Cart } from './cart';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css'],
})
export class PanierComponent implements OnInit, OnDestroy {
  public cart!: Cart;
  public diameter: number = 400;
  public itemsCartForTemplate: ItemCart[] = [];
  public URL_IMG = environment.URL_IMG;
  public total!: number;
  public user!: User;
  public subscription: Subscription = new Subscription();
  public loading: boolean = false;
  public loaded: boolean = true;
  public promo$!: Observable<Product[] | null>;
  public checkoutInit: boolean = false;
  
  constructor(
    private cartService: CartService,
    private userServive: UserService,
    private productService: ProductService,
    private orderService: OrderService,
    private router: Router,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    if (window.innerWidth < 600) {
      this.diameter = 200;
    }
    this.promo$ = this.productService.PromoSubject.pipe();
    if (!this.promo$._isScalar) {
      this.promo$ = this.productService.getProductPromo().pipe();
    }
    this.subscription.add(this.userServive.user$().subscribe((user) => {
      if (user) {
        this.user = user;
      }
    }));
    //

    this.subscription.add(this.cartService.cart$.subscribe((items: ItemCart[]) => {
      if(items.length === 0){
        this.alertService.MakeAlert('Votre panier est vide !', "info", 2000).then(()=>{
          this.router.navigate(['/'])
        })
      }
      this.cart = new Cart(this.user, items);
      this.itemsCartForTemplate = this.cart.items;
      console.log(this.itemsCartForTemplate);
      
      this.total = this.cart.calculTotal();
      localStorage.removeItem('cart');
      localStorage.setItem('cart', JSON.stringify(this.cart.items));
    }));
    //
  }
  initCheckout() {
    if (this.user && this.user.confirmed) {
      this.checkoutInit = true;
      this.loaded = false;
      this.loading = true;
      const orderItem = this.cart.getItemOrder();
      console.log(orderItem);

      this.orderService.startCheckout(orderItem, this.user).subscribe(
        (session) => {
          console.log(session);
          this.orderService.redirectToCheckout(session);
          this.checkoutInit = false;
          // this.loaded = true;
          // this.loading = false;
        },
        (err) => {
          this.loaded = true;
          this.loading = false;
          this.checkoutInit = false;
        }
      );
    } else {
      this.alertService.MakeAlert('Vous n\'avez pas finaliser la création de votre compte', 'error')
      .then((res) => {
       return
      });
    }
  }
  

  updateQuantity(qty: number, index: number): void {
    this.cartService.updateQuantity(qty, index);
  }

  deleteItem(index: number): void {
    this.cartService.deleteItem(index);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
