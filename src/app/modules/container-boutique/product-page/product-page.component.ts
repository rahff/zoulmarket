import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/shared/models/product';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css'],
})
export class ProductPageComponent implements OnInit {
  public BASE_URL_IMG = environment.URL_IMG;
  public currentImg: string = this.BASE_URL_IMG + '';
  public arraySmallImg: string[] = [];
  public arrayBigImg: string[] = [];
  public product!: Product;
  public characteristics: string[] = [];
  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.product = this.activatedRoute.snapshot.data['product'];
    this.currentImg = this.BASE_URL_IMG + `${this.product.img[0].img_big}`;
    this.arraySmallImg = this.extractSmallImg()
    this.arrayBigImg = this.extractBigImg()
    console.log(this.arraySmallImg);
    console.log(this.arrayBigImg);
    
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
}
