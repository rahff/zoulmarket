import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { ItemCart } from 'src/app/shared/models/item-cart.model';
import { Product } from 'src/app/shared/models/product';
import { Variation } from 'src/app/shared/models/variation.model';
import { CartService } from 'src/app/shared/services/cart.service';
import { ProductService } from 'src/app/shared/services/product.service';



@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit, AfterViewInit, OnDestroy {

  public product!: Product;
  private idProduct: string | null | undefined;
  private subciption: Subscription = new Subscription()
  public itemForCart: any;
  public variations: Variation[] | null | undefined  = null
  public nameOfProduct: string = "";
  public sizeMode!: "Taille" | "Pointure" | null;
  public currentSize: any[] | null = null;
  public choicedSize: any;
  public enableAddToCart: boolean = false;
  constructor(private productService: ProductService,
              private activatedRoute: ActivatedRoute,
              private cartService: CartService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap)=>{
      this.idProduct = paramMap.get('id');
      if(this.idProduct){
        this.subciption.add(this.productService.getProductById(this.idProduct).subscribe((product: Product)=>{
          this.product = product;
          this.nameOfProduct = this.product.name;
          this.variations = this.product.variations
          if(this.product.pointures){
            this.sizeMode = "Pointure";
            this.currentSize = this.product.pointures;
          }else if(this.product.sizes){
            this.sizeMode = "Taille";
            this.currentSize = this.product.sizes
          }else if(this.product.sizes_XXS_TO_XXXL){
            this.sizeMode = "Taille";    
            this.currentSize = this.product.sizes_XXS_TO_XXXL
          }
          if(!this.product.pointures && !this.product.sizes && !this.product.sizes_XXS_TO_XXXL){
            this.enableAddToCart = true
          }
          if(!this.product.variations){
            this.product.variations = []
          }
        }))
      }
    })
  }
  ngAfterViewInit(): void {
  }
  changeVariationData(obj: { variation: Variation, index: number}): void{
    if(this.variations){
      this.variations[obj.index] = {
        description: this.product.description,
        id: this.product.id,
        img: this.product.img,
        name: this.product.name,
        price: this.product.price
      }
    }
    this.product = {
      ...this.product,
      description: obj.variation.description,
      img: obj.variation.img,
      name: obj.variation.name,
      price: obj.variation.price,
      id: obj.variation.id,
    }
    
  }
  setChoisedSize(size: any){
    this.choicedSize = size
    this.enableAddToCart = true
  }
  sendProductToCart(obj: any): void {
    const itemForCart: ItemCart = {
      product: obj.product,
      quantity: obj.quantity,
      cost: obj.product.price 
    } 
    this.cartService.addItemToCart(itemForCart)    
  }
  ngOnDestroy(): void {
    this.subciption.unsubscribe()
  }

}
