import { Output, SimpleChanges, ViewChild } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { AfterViewInit, Component, Input, OnChanges, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/models/product';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css']
})

export class DescriptionComponent implements OnInit, OnChanges, AfterViewInit {
  @Input('product') public product!: Product;
  @Input('enableAddToCart') public enableAddToCart!: boolean;
  public characteristics: string[] = [];
  public quantity: number = 1;
  public isMissedChooseSize: boolean = false
  @Output() private EmmitItemForCart: EventEmitter<any> = new EventEmitter<any>();
  constructor() { 

  }
  ngOnChanges(changes: SimpleChanges): void{
    if(changes.product){
      if(changes.product?.currentValue){
        this.characteristics = this.extractCharacteristicsOfProduct(changes.product.currentValue.characteristics)
      }
    }
    if(changes.enableAddToCart){
      if(changes.enableAddToCart.currentValue){
        if(changes.enableAddToCart.currentValue === true){
          console.log(changes.enableAddToCart.currentValue);
          
          this.isMissedChooseSize = false
        }
      }
    }
  }
  ngOnInit(): void {
  
    
  }
  ngAfterViewInit(): void{
  }
  updateQuantity(quantity: number): void {
    this.quantity = quantity;
  }
  addProductToCart(): void {  
    if(this.enableAddToCart){
      this.isMissedChooseSize = false;

      this.EmmitItemForCart.emit({product: {...this.product}, quantity: this.quantity })
    }else{
      this.isMissedChooseSize = true;
    }
  }
  extractCharacteristicsOfProduct(data: any):string[]{
    const arrayCharacteristics = []
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        const element = data[key];
        arrayCharacteristics.push(element)
      }
    }
    return arrayCharacteristics
  }
 
}
