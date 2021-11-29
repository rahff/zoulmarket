import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';
import { ItemCart } from 'src/app/shared/models/item-cart.model';
import { Purchase, Subject } from 'src/app/shared/models/order.model';
import { Product } from 'src/app/shared/models/product';
import { User } from 'src/app/shared/models/user.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  public purchases: Purchase[] | undefined = [];
  public URL_IMG = environment.URL_IMG;
  public panelOpenState: boolean = false;
  public diameter: number = 500;
  public loading = false;
  public user!: User;
  public subcription: Subscription = new Subscription()
  constructor(private userService: UserService,
              private cartService: CartService,
              private productService: ProductService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    if(window.innerWidth < 600){
      this.diameter = 200;
    }
    this.userService.user$().subscribe((user) => {
      if(user){
        this.user = user;
        this.purchases = user.orders
      }
    });
    
  }
  extractPurchaseItem(array: Purchase[] | undefined): any[]{
    const arrayItems:Subject[] = []

    if(array){
      for (let i = 0; i < array.length; i++) {
       const subjectItem = array[i].subject
       arrayItems.push(...subjectItem);
      }
      
    }
    return [...arrayItems]
  }
  addToCartAndRedirect(item: any): void {
    console.log(item);
    this.loading = true;
    this.subcription.add(this.productService.getProductById(item.productId).subscribe((product: Product)=>{
      const newItem: ItemCart = {
        cost: item.price,
        product: product,
        quantity: item.quantity,
        size: item.size
      }
      this.cartService.cart$.next([]);
      this.cartService.addItemToCart(newItem)
      this.router.navigate(['/panier'])
    }))
  }
  routeToRating(id: string): void {
    this.router.navigate(['avis'], {
      queryParams: {productId: id, userId: this.user.id, username: this.user.firstname},
      relativeTo: this.activatedRoute
    })
  }
}
