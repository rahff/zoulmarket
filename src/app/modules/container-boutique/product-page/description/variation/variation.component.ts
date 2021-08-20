import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatSelect } from '@angular/material/select';
import { Variation } from 'src/app/shared/models/variation.model';
import { environment } from 'src/environments/environment';


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
  @Input('variations') public variations: Variation[] | null | undefined = []  
  @Input('currentSize') public currentSize!: any[] | null; 
  @Input('sizeMode') public sizeMode!: "Taille" | "Pointure" | null ;
  @Input('data') public data: any;
  public URL = environment.URL_IMG;
  public valueSize: any;
  public quantity: number = 1
  constructor() { }

  ngOnInit(): void {
    
  }
  ngOnChanges(changes: SimpleChanges): void {
  
    if(changes.currentSize.currentValue){
      this.currentSize = this.extractkeyOfCurrentSize(changes.currentSize.currentValue)
    }
  }
  setValueOfSize(){
  this.valueSize = this.inputSize.value
  this.sizeEmitter.emit(this.valueSize)  
  }
  changeVariation(variation: Variation, index: number): void{
    this.variationEmitter.emit({variation, index})
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
