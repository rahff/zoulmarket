import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { ItemCart } from 'src/app/shared/models/item-cart.model';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/shared/models/user.model';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/shared/models/product';
import { Observable, Subscription } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';
import { MakeAlert } from 'src/app/shared/functions';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';
import { Cart } from './cart';
import { Router } from '@angular/router';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css'],
})
export class PanierComponent implements OnInit, OnDestroy {
  public onScreen: boolean = false;
  public onMobile: boolean = false;
  public cart!: Cart;
  public diameter: number = 400;
  public itemsCartForTemplate: ItemCart[] = [];
  public URL_IMG = environment.URL_IMG;
  public total!: number;
  public showSuccess: boolean = false;
  public showCancel: boolean = false;
  public showError: boolean = false;
  public user!: User;
  public subscription: Subscription = new Subscription();
  public formUser!: FormGroup;
  public loading: boolean = false;
  public loaded: boolean = true;
  public promo$!: Observable<Product[] | null>;
  public checkoutInit: boolean = false;
  public cities = [
    'Vesoul',
    'Navenne',
    'Quincey',
    'Noidans-lès-Vesoul',
    'Vaivre',
    'Coulevon',
  ];
  get name() {
    return this.formUser.get('name');
  }
  get firstname() {
    return this.formUser.get('firstname');
  }
  get city() {
    return this.formUser.get('city');
  }
  get numero() {
    return this.formUser.get('numero');
  }
  get postal() {
    return this.formUser.get('postal');
  }
  get street() {
    return this.formUser.get('street');
  }
  get tel() {
    return this.formUser.get('tel');
  }
  get email() {
    return this.formUser.get('email');
  }
  constructor(
    private cartService: CartService,
    private userServive: UserService,
    private fb: FormBuilder,
    private productService: ProductService,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (window.innerWidth < 600) {
      this.diameter = 200;
      this.onMobile = true;
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
    this.initForm(this.user);
    this.onScreen = true;
    //

    this.subscription.add(this.cartService.cart$.subscribe((items: ItemCart[]) => {
      if(items.length === 0){
        MakeAlert('Votre panier est vide !', "info", 2000).then(()=>{
          this.router.navigate(['/'])
        })
      }
      this.cart = new Cart(this.user, items);
      this.itemsCartForTemplate = this.cart.items;
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
          this.loaded = true;
          this.loading = false;
        },
        (err) => {
          this.loaded = true;
          this.loading = false;
          this.checkoutInit = false;
        }
      );
    } else {
      MakeAlert('Vous n\'avez pas finaliser la création de votre compte', 'error')
      .then((res) => {
       return
      });
    }
  }
  findCityUser(user: User | null): number {
    if (user) {
      const res = this.cities.indexOf(user.adresse.city);
      if (res !== -1) {
        return res;
      } else {
        return 0;
      }
    } else {
      return 0;
    }
  }
  initForm(user: User | null) {
    if (!user) {
      this.formUser = this.fb.group({
        name: ['', Validators.required],
        firstname: ['', Validators.required],
        numero: ['', Validators.required],
        street: ['', Validators.required],
        postal: ['', Validators.required],
        city: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        tel: ['', Validators.required],
      });   
    } else {
      this.formUser = this.fb.group({
        name: [this.user?.name, Validators.required],
        firstname: [this.user?.firstname, Validators.required],
        numero: [this.user?.adresse.numero, Validators.required],
        street: [this.user?.adresse.rue, Validators.required],
        postal: [this.user?.adresse.postal, Validators.required],
        city: [this.cities[this.findCityUser(this.user)], Validators.required],
        email: [this.user?.email, [Validators.required, Validators.email]],
        tel: [this.user?.tel, Validators.required],
      });
      this.formUser.disable()
    }
  }
  updateQuantity(obj: number, index: number): void {
    this.cartService.updateQuantity(obj, index);
  }

  deleteItem(index: number): void {
    this.cartService.deleteItem(index);
  }

  reinitCart(): void {
    this.total = 0;
    localStorage.removeItem('cart');
  }

  ngOnDestroy(): void {
    this.onScreen = false;
    this.subscription.unsubscribe()
  }
}
