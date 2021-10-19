import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatSelect } from '@angular/material/select';
import { Product } from 'src/app/shared/models/product';
import { Variation } from 'src/app/shared/models/variation.model';
import { environment } from 'src/environments/environment';
import { defineSizeOfProduct, VariationService } from '../../utils';


@Component({
  selector: 'app-variation',
  templateUrl: './variation.component.html',
  styleUrls: ['./variation.component.css']
})
export class VariationComponent implements OnInit, OnChanges {
  @ViewChild('container') el!: ElementRef<HTMLDivElement>;
  @ViewChild('inputSize', {static: false}) inputSize!:MatSelect;
  @Output() public variationEmitter: EventEmitter<{ variation: Variation, index: number}> = new EventEmitter<{ variation: Variation, index: number}>()
  @Output() public sizeEmitter: EventEmitter<any> = new EventEmitter<any>()
  public variations: Variation[] | null | undefined = []  
  public currentSize!: any[] | null; 
  public sizeMode!: "Taille" | "Pointure" | null ;
  @Input('product') public product!: Product
  public URL = environment.URL_IMG;
  public valueSize: any;
  public quantity: number = 1
  constructor(private variationService: VariationService) { }

  ngOnInit(): void {
    if(this.product){
      this.variations = this.product.variations
      this.currentSize = defineSizeOfProduct(this.product).currentSize;
      this.currentSize = this.extractkeyOfCurrentSize(this.currentSize)
      this.sizeMode = defineSizeOfProduct(this.product).sizeMode;
    }
  }
  ngOnChanges(changes: SimpleChanges): void {

  }
  setValueOfSize(){
  this.valueSize = this.inputSize.value
  this.variationService.setSizeForProduct(this.valueSize);
  }
  changeVariation(variation: Variation, index: number): void{
   this.variationService.changeVariationData({variation, index})
  }
  extractkeyOfCurrentSize(data: any):any[]{
    const arraySizes = []
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        const element = data[key];
        arraySizes.push(element)
      }
    }
    return arraySizes
  }
}
