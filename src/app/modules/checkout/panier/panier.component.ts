import { Component, OnInit } from '@angular/core';
import { ItemCart } from 'src/app/shared/models/item-cart.model';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit {

  public cart!: ItemCart[]
  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.cart$.subscribe((cart: ItemCart[])=>{
      this.cart = cart
      console.log(this.cart);
      
    })
  }

}
