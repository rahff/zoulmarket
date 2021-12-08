import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/shared/models/product';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css'],
})
export class ProductPageComponent implements OnInit, OnDestroy {
  public BASE_URL_IMG = environment.URL_IMG;
  public currentImg: string = this.BASE_URL_IMG + '';
  public arraySmallImg: string[] = [];
  public arrayBigImg: string[] = [];
  public product!: Product;
  public characteristics: string[] = [];
  private productId: string | null = null;
  private subscription: Subscription = new Subscription()
  constructor(private productService: ProductService, 
              private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
      this.subscription.add(this.activatedRoute.paramMap.subscribe((queryParam: ParamMap)=>{
      this.productId = queryParam.get('id');
      console.log(this.productId);
      
      if(this.productId){
       this.productService.getProductById(this.productId).subscribe((product: Product)=>{
         this.product = product;
         this.initImg()
       })
      }
    }))
  }
  initImg(): void {
    this.currentImg = this.BASE_URL_IMG + `${this.product.img[0].img_big}`;
    this.arraySmallImg = this.extractSmallImg();
    this.arrayBigImg = this.extractBigImg();
    this.characteristics = this.extractCharacteristics(
      this.product.characteristics
    );
  }
  extractSmallImg(): string[] {
    const result: string[] = [];
    for (const obj of this.product.img) {
      const element = obj["img_mini"];
      result.push(`${this.BASE_URL_IMG + element}`)
      }
    return result;
  }
  extractBigImg(): string[] {
    const result: string[] = [];
    for (const obj of this.product.img) {
      const element = obj["img_big"];
      result.push(`${this.BASE_URL_IMG + element}`)
      }
    return result;
  }
  extractCharacteristics(data: any): string[] {
    const result: string[] = [];
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        const element = data[key];
        result.push(element);
      }
    }
    return result;
  }
  changeImg(index: number): void {
    this.currentImg = this.arrayBigImg[index]
  }
  ngOnDestroy(): void{
    this.subscription.unsubscribe()
  }
}
