import { Output, SimpleChanges, ViewChild } from '@angular/core';
import { EventEmitter } from '@angular/core';
import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  OnInit,
} from '@angular/core';
import { MakeAlert } from 'src/app/shared/functions';
import { Product } from 'src/app/shared/models/product';
import { VariationService } from '../utils';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css'],
})
export class DescriptionComponent implements OnInit, OnChanges, AfterViewInit {
  @Input('product') public product!: Product;
  @Input('enableAddToCart') public enableAddToCart!: boolean;
  @Input('onMobile') public onMobile: boolean = false;
  public characteristics: string[] = [];
  public quantity: number = 1;
  public rating: string[] = [];
  public isMissedChooseSize: boolean = false;
  public currentFNSKU!: string;
  public showAvis: boolean = false
  @Output() private EmmitItemForCart: EventEmitter<any> =
    new EventEmitter<any>();
  @Output() private EmitterAvisEvent: EventEmitter<boolean> =
    new EventEmitter<any>();
  constructor(private variationService: VariationService) {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.product) {
      if (changes.product?.currentValue) {
        this.characteristics = this.extractCharacteristicsOfProduct(
          changes.product.currentValue.characteristics
        );
      }
      if (changes.onMobile?.currentValue) {
        this.onMobile = changes.onMobile.currentValue;
      }
    }
    if (changes.enableAddToCart) {
      if (changes.enableAddToCart.currentValue) {
        if (changes.enableAddToCart.currentValue === true) {
          this.isMissedChooseSize = false;
        }
      }
    }
  }
  ngOnInit(): void {
    this.currentFNSKU = this.product.FNSKU;
    this.variationService.variation$.subscribe((variation) => {
      if (variation) {
        this.currentFNSKU = variation?.variation.FNSKU;
      }
    });
    this.rating = this.calculRatingProduct();
    console.log(this.rating);
    
  }

  ngAfterViewInit(): void {}
  calculRatingProduct(): string[] {
    let total: number = 0;
    console.log(total);
    this.product.avis.forEach((el)=>{
      total += el.rating;
      console.log(total);
    })
    const array:string[] = []
    if(total > 0){
      const result = total / this.product.avis.length;
      for (let i = 0; i < 5; i++) {
       if(result > i){
         array.push("star")
      }else{
        array.push("star_outline")
      }
     }
    }
  return array
}
nbrOfStarForAvis(rating: number): any[]{
  const array: number[] = []
  for (let i = 0; i < rating; i++) {
    array.push(i)
  }
  console.log(array);
  
  return array
}
  updateQuantity(quantity: number): void {
    this.quantity = quantity;
  }
  addProductToCart(): void {
    if (this.enableAddToCart) {
      this.isMissedChooseSize = false;
      this.product.FNSKU = this.currentFNSKU;
      this.EmmitItemForCart.emit({
        product: { ...this.product },
        quantity: this.quantity,
      });
      MakeAlert('Votre produit a été ajouter au panier', "success", 1500)
    } else {
      this.isMissedChooseSize = true;
    }
  }
  emitAvisEvent(): void {
    if(this.onMobile){
      this.showAvis = true;
      setTimeout(() => {
        document.getElementById('avis')?.scrollIntoView({behavior: "smooth"})
      }, 100);
    }
    this.EmitterAvisEvent.emit(true);
  }
  extractCharacteristicsOfProduct(data: any): string[] {
    const arrayCharacteristics = [];
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        const element = data[key];
        arrayCharacteristics.push(element);
      }
    }
    return arrayCharacteristics;
  }
  setFace(rating: number): string{
    if(rating >= 4){
      return "sentiment_satisfied_alt";
    }else if(rating = 3){
      return "sentiment_neutral";
    }else{
      return "sentiment_dissatisfied" 
    }
  }
}
