import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Category } from 'src/app/shared/models/category.model';
import { Product } from 'src/app/shared/models/product';
import { Store } from 'src/app/shared/models/store';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-card-product',
  templateUrl: './card-product.component.html',
  styleUrls: ['./card-product.component.css']
})
export class CardProductComponent implements OnInit, OnChanges {

  public URL_IMG = environment.URL_IMG;
  @Input('product') public product: Product | null = null;
  @Input('suggestion') public suggestion: Category | null = null;
  @Input('store') public store: Store | null = null;
  public rating: number = 0;
  public arrayStars: string[] = []
  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    
  }
  calculMoyenne(somme: number, length: number | undefined): number {
    if(length){
      return somme / length
    }else{
      return 0
    }
  }
  ngOnInit(): void {
    
  }

}
