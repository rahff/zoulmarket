import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Variation } from 'src/app/shared/models/variation.model';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-variation',
  templateUrl: './variation.component.html',
  styleUrls: ['./variation.component.css']
})
export class VariationComponent implements OnInit, AfterViewInit {
  @ViewChild('container') el!: ElementRef<HTMLDivElement>;
  @Output() public variationEmitter: EventEmitter<{ variation: Variation, index: number}> = new EventEmitter<{ variation: Variation, index: number}>()
  @Input('variations') public variations: Variation[] | null | undefined = []  
  @Input('data') public data: any;
  public URL = environment.URL_IMG;
  public quantity: number = 1
  constructor() { }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
   
  }
  changeVariation(variation: Variation, index: number): void{
    this.variationEmitter.emit({variation, index})
  }
}
