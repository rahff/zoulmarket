import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ItemCart } from '../models/item-cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public cart$: BehaviorSubject<ItemCart[]> = new BehaviorSubject<ItemCart[]>([])
  constructor() { }

  addItemToCart(item: ItemCart): void {
    this.cart$.next([...this.cart$.value, item])
  }
}
