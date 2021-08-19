import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
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
    console.log(obj);
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
  ngOnDestroy(): void {
    this.subciption.unsubscribe()
  }

}
