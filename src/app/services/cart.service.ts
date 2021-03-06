import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CoreModule } from '../core/core.module';
import { ItemCart } from '../shared/models/item-cart.model';



@Injectable({
  providedIn: CoreModule
})
export class CartService {

  public cart$: BehaviorSubject<ItemCart[]> = new BehaviorSubject<ItemCart[]>([])
  public cartLength$: BehaviorSubject<number> = new BehaviorSubject<number>(0)
  constructor() {
    if(localStorage.getItem('cart')){
      const cart = localStorage.getItem('cart')
      if(cart){
        const itemCart: ItemCart[] = JSON.parse(cart)
        this.cart$.next(itemCart)
        this.cartLength$.next(itemCart.length)
      }
    }
   }
   getCartLength(): Observable<number>{
     return this.cartLength$.asObservable()
   }
   updateQuantity(qty: number, index: number): void {
       if(this.cart$.value[index]){
         this.cart$.value[index].quantity = qty
         this.cart$.value[index].cost = this.cart$.value[index].product.price * this.cart$.value[index].quantity
         this.cart$.next(this.cart$.value)
       }
  }

  addItemToCart(item: ItemCart): void {
    console.log(this.cart$.value);
    let update = false;
    this.cart$.value.forEach((it: ItemCart)=>{
      if(item.size){
        if(it.product === item.product && it.size === item.size){
          it.quantity += item.quantity;
          it.cost = it.quantity * it.product.price;
          update = true
        }
      }else{
        if(it.product === item.product){
          it.quantity += item.quantity;
          it.cost = it.quantity * it.product.price;
          update = true
        }
      }
    })
    if(update){
      this.cart$.next([...this.cart$.value]);
    }else{
      this.cart$.next([...this.cart$.value, item]);
    }
    this.cartLength$.next(this.cart$.value.length)
  }
  
  deleteItem(index: number): void {
    this.cart$.value.splice(index, 1);
    this.cart$.next(this.cart$.value)
    this.cartLength$.next(this.cart$.value.length)
   }
   reinitCart(): void {
    this.cartLength$.next(0)
     this.cart$.next([]);
     localStorage.removeItem('cart')
   }
}
