import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { ItemCart } from 'src/app/shared/models/item-cart.model';
import { Product } from 'src/app/shared/models/product';
import { Variation } from 'src/app/shared/models/variation.model';
import { defineSizeOfProduct, isVariable, VariationService } from './utils';




@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit, OnDestroy {

  public onScreen: boolean = false;
  public product!: Product;
  public onMobile: boolean = false;
  public subciption: Subscription = new Subscription()
  public itemForCart: any;
  public variations: Variation[] | null | undefined  = null
  public nameOfProduct: string = "";
  public sizeMode!: "Taille" | "Pointure" | null;
  public currentSize: any[] | null = null;
  public choicedSize: any;
  public enableAddToCart: boolean = false;
  constructor(private activatedRoute: ActivatedRoute,
              private cartService: CartService,
              private variationService: VariationService) { }

  ngOnInit(): void {
    if(window.innerWidth < 600){
      this.onMobile = true;    
    }
    this.onScreen = true;
    this.product = this.activatedRoute.snapshot.data["product"]
    this.nameOfProduct = this.product.name;
    if(isVariable(this.product)){
      this.variations = this.product.variations
    }else{
      this.product.variations = []
    }
    this.subciption.add(this.variationService.variation$.subscribe((obj)=>{
      if(this.variations){
        if(obj){
        this.variations[obj.index] = obj.variation;
        this.product = {
          ...this.product,
          description: obj.variation.description,
          img: obj.variation.img,
          name: obj.variation.name,
          price: obj.variation.price,
          id: obj.variation.id,
        }
      }
      }
    }))
    this.subciption.add(this.variationService.size$.subscribe((size)=>{
      this.setChoisedSize(size);
    }))
    this.sizeMode = defineSizeOfProduct(this.product).sizeMode;
    this.currentSize = defineSizeOfProduct(this.product).currentSize
  }
  setChoisedSize(size: any){
    this.choicedSize = size
    this.enableAddToCart = true
  }
  sendProductToCart(obj: any): void {
    const itemForCart: ItemCart = {
      product: obj.product,
      quantity: obj.quantity,
      cost: +(obj.product.price *obj.quantity).toFixed(2)
    } 
    this.cartService.addItemToCart(itemForCart)    
  }
  ngOnDestroy(): void {
    this.subciption.unsubscribe()
    this.onScreen = false;
  }

}
