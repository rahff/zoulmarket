import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ItemCart } from '../shared/models/item-cart.model';


@Injectable({
  providedIn: 'root'
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
   updateQuantity(qty: number, index: number): void {
       if(this.cart$.value[index]){
         this.cart$.value[index].quantity = qty
         this.cart$.value[index].cost = this.cart$.value[index].product.price * this.cart$.value[index].quantity
         this.cart$.next(this.cart$.value)
       }
  }

  addItemToCart(item: ItemCart): void {
    console.log(this.cart$.value);
    
    this.cart$.next([...this.cart$.value, item]);
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
