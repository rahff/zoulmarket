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
  @Input('product') public product!: Product;
  @Input('suggestion') public suggestion!: Category;
  @Input('store') public store!: Store;
  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    
  }

  ngOnInit(): void {
    
  }

}
