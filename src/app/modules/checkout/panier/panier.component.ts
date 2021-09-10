import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { ItemCart } from 'src/app/shared/models/item-cart.model';
import { environment } from 'src/environments/environment';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/shared/models/user.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/shared/models/product';
import { Observable, Subscription } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';
import { Order } from 'src/app/shared/models/order.model';
import { Store } from 'src/app/shared/models/store';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css'],
})
export class PanierComponent implements OnInit, OnDestroy {
  public payPalConfig! : IPayPalConfig;
  public onScreen: boolean = false;
  public cart!: ItemCart[];
  public URL_IMG = environment.URL_IMG;
  public total!: number;
  public showSuccess: boolean = false;
  public showCancel: boolean = false;
  public showError: boolean = false;
  public user: User | null = null;
  public formUser!: FormGroup;
  public promo$!: Observable<Product[] | null>;
  public cities = ['Vesoul', 'Navenne', "Quincey","Noidans-lès-Vesoul", "Vaivre", "Coulevon"]
  private ID_PAYPAL = environment.PAYPAL_CLIENT_ID;
  private Order: Order | null = null;
  private Orders: Order[] = [];
  private URL_API = environment.URL_API
  get name(){
    return this.formUser.get('name')
  }
  get firstname(){
    return this.formUser.get('firstname')
  }
  get city(){
    return this.formUser.get('city')
  }
  get numero(){
    return this.formUser.get('numero')
  }
  get postal(){
    return this.formUser.get('postal')
  }
  get street(){
    return this.formUser.get('street')
  }
  get tel(){
    return this.formUser.get('tel')
  }
  get email(){
    return this.formUser.get('email')
  }
  constructor(private cartService: CartService,
              private auth: AuthService,
              private fb: FormBuilder,
              private productService: ProductService,
              private orderService: OrderService) {}

  ngOnInit(): void {
   this.promo$ = this.productService.PromoSubject.pipe()
   if(!this.promo$._isScalar){
     console.log('tyty');
     this.promo$ = this.productService.getProductPromo().pipe()
   }
    this.productService.PromoSubject
    this.auth.user$.subscribe((user)=>{
      this.user = user      
    })
    this.initForm(this.user)
    this.onScreen = true;
    this.initConfig()
    this.cartService.cart$.subscribe((cart: ItemCart[]) => {
      this.cart = cart;
      this.total = this.initTotalOfCart();
      localStorage.removeItem('cart');
      localStorage.setItem('cart', JSON.stringify(this.cart));
    });
  }
  findCityUser(user: User | null):number{
    if(user){
      const res =  this.cities.indexOf(user.city)
      if(res !== -1){
        return res
      }else{
        return 0
      }
    }else{
      return 0
    }
  }
  initForm(user:User | null){
    if(!user){
      this.formUser = this.fb.group({
        name: ['', Validators.required],
        firstname: ['', Validators.required],
        numero: ["", Validators.required],
        street: ['', Validators.required],
        postal: ['', Validators.required],
        city: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        tel: ['', Validators.required]
      })
    }else{
      this.formUser = this.fb.group({
        name: [this.user?.name, Validators.required],
        firstname: [this.user?.firstname, Validators.required],
        numero: [this.user?.numero, Validators.required],
        street: [this.user?.street, Validators.required],
        postal: [this.user?.postal, Validators.required],
        city: [this.cities[this.findCityUser(this.user)], Validators.required],
        email: [this.user?.email, [Validators.required, Validators.email]],
        tel: [this.user?.tel, Validators.required]
      })
    }
  }
  updateQuantity(obj: number, index: number): void {
    this.cartService.updateQuantity(obj, index);
  }
  initTotalOfCart(): number {
    let result = 0;
    for (const item of this.cart) {
      result += item.cost;
    }
    return result;
  }
  deleteItem(index: number): void {
    this.cartService.deleteItem(index);
  }
  private async createOrders(item: ItemCart): Promise<Order>{
    const id = item.product.store
      const req = await fetch(this.URL_API + "stores/" + id)
      const store: Store = await req.json()
      const newOrder = new Order(item, store.email, this.user, store.id)
      return newOrder
   
  }
  reinitCart(): void {
    this.cart = []
    this.total = 0;
    localStorage.removeItem('cart')
  }
  private initConfig(): void {
    this.payPalConfig = {
        currency: 'EUR',
        clientId: this.ID_PAYPAL,
        createOrderOnClient: (data) => < ICreateOrderRequest > {
            intent: 'CAPTURE',
            purchase_units: [{
                amount: {
                    currency_code: 'EUR',
                    value: this.initTotalOfCart().toFixed(2).toString(),
                    breakdown: {
                        item_total: {
                            currency_code: 'EUR',
                            value: this.initTotalOfCart().toFixed(2).toString() ,
                        }
                    }
                },
                // items: [{
                //     name: 'ZoulMarket',
                //     quantity: this.cart.length.toString(),
                //     category: 'PHYSICAL_GOODS',
                //     unit_amount: {
                //         currency_code: 'EUR',
                //         value: this.initTotalOfCart().toFixed(2).toString(),
                //     },
                // }]
            }]
        },
        advanced: {
            commit: 'true'
        },
        style: {
            label: 'paypal',
            layout: 'vertical'
        },
        onApprove: (data, actions) => {
            console.log('onApprove - transaction was approved, but not authorized', data, actions);
            actions.order.get().then((details: any) => {
                console.log('onApprove - you can get full order details inside onApprove: ', details);
              
              this.cart.forEach((item)=>{
                this.createOrders(item).then((data)=>{
                 this.Orders.push(data)
                 console.log(this.Orders.length);
                 
                })
              })
      
            });

        },
        onClientAuthorization: (data) => {
            console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
            this.Orders.forEach((order)=>{
              this.orderService.postNewOrder(order).subscribe((res)=>{
                console.log(res);
                
              })
            })
            this.cartService.cartLength$.next(0)
            this.reinitCart();
            this.showSuccess = true;
        },
        onCancel: (data, actions) => {
            console.log('OnCancel', data, actions);
            this.showCancel = true;

        },
        onError: err => {
            console.log('OnError', err);
            this.showError = true;
        },
        onClick: (data, actions) => {
            console.log('onClick', data, actions);
          
        },
    };
}

  ngOnDestroy(): void {
    this.onScreen = false;
  }
}
