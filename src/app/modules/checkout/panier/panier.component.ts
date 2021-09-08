import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { ItemCart } from 'src/app/shared/models/item-cart.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit, OnDestroy {

  public onScreen: boolean = false;
  public cart!: ItemCart[]
  public URL_IMG = environment.URL_IMG;
  public total!: number
  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.onScreen = true;
    this.cartService.cart$.subscribe((cart: ItemCart[])=>{
      this.cart = cart
      this.total = this.initTotalOfCart()
      localStorage.removeItem('cart');
      localStorage.setItem('cart', JSON.stringify(this.cart))
    })
  }
  updateQuantity(obj: number, index: number): void {
    this.cartService.updateQuantity(obj, index)  
  }
  initTotalOfCart(): number{
    let result = 0
   for (const item of this.cart) {
      result += item.cost;
   }
   return result
  }
  deleteItem(index: number): void {
   this.cartService.deleteItem(index);
  }
  ngOnDestroy(): void{
    this.onScreen = false
  }
}
