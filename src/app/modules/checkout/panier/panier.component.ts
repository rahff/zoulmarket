import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { ItemCart } from 'src/app/shared/models/item-cart.model';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/shared/models/user.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/shared/models/product';
import { Observable } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';

import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';
import { Cart } from './cart';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css'],
})
export class PanierComponent implements OnInit, OnDestroy {

  public onScreen: boolean = false;
  public cart!: Cart;
  public diameter: number = 400
  public itemsCartForTemplate: ItemCart[] = []
  public URL_IMG = environment.URL_IMG;
  public total!: number;
  public showSuccess: boolean = false;
  public showCancel: boolean = false;
  public showError: boolean = false;
  public user!: User;
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
  private ID_PAYPAL = environment.PAYPAL_CLIENT_ID;
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
  ) {}

  ngOnInit(): void {
    if(window.innerWidth < 600){
      this.diameter = 200
    }
    this.promo$ = this.productService.PromoSubject.pipe();
    if (!this.promo$._isScalar) {
      this.promo$ = this.productService.getProductPromo().pipe();
    }
    this.userServive.user$.subscribe((user) => {
      if(user){
        this.user = user;
      }
    });
    this.initForm(this.user);
    this.onScreen = true;
    //

    this.cartService.cart$.subscribe((items: ItemCart[]) => {
      this.cart = new Cart(this.user, items);
      this.itemsCartForTemplate = this.cart.items
      this.total = this.cart.calculTotal()
      localStorage.removeItem('cart');
      localStorage.setItem('cart', JSON.stringify(this.cart.items));
    });
    //
  }
  initCheckout(){
    if(this.user){
      this.checkoutInit = true;
      const productIds = this.cart.getProductIds();
      const productIdsAndQty = this.cart.getProductIdsAndQty();
      this.orderService.startCheckout(productIds, productIdsAndQty, this.user).subscribe((session)=>{
        console.log(session);
        this.orderService.redirectToCheckout(session)
        this.checkoutInit = false
      },
      (err)=>{
        this.checkoutInit = false;
      })
    }else{
      return
    }

  }
  findCityUser(user: User | null): number {
    if (user) {
      const res = this.cities.indexOf(user.adress.city);
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
        numero: [this.user?.adress.numero, Validators.required],
        street: [this.user?.adress.street, Validators.required],
        postal: [this.user?.adress.postal, Validators.required],
        city: [this.cities[this.findCityUser(this.user)], Validators.required],
        email: [this.user?.email, [Validators.required, Validators.email]],
        tel: [this.user?.tel, Validators.required],
      });
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
  makePayements(): Promise<{orderId: string | null}>{
    return new Promise((resolve, reject) =>{
      return new Promise((resolve, reject)=>{
        const orders = this.cart.createOrderForItems()
        this.orderService.postNewOrder(orders).subscribe((res)=>{
          if(res.status === 200){
            resolve(res.result)
          }else{
            reject(res.result)
          }
        })
      })
    })
  }
  
ngOnDestroy(): void {
  this.onScreen = false;
}
}


