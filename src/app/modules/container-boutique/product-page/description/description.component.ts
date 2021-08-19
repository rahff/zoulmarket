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
  public characteristics: string[] = [];
  public quantity: number = 1;
  @Output() private EmmitItemForCart: EventEmitter<any> = new EventEmitter<any>();
  constructor() { 

  }
  ngOnChanges(changes: SimpleChanges): void{
    if(changes.product.currentValue){
      this.characteristics = this.extractCharacteristicsOfProduct(changes.product.currentValue.characteristics)
    }
  }
  ngOnInit(): void {
  
    
  }
  ngAfterViewInit(): void{
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
