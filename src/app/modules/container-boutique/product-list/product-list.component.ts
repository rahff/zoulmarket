import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/shared/models/product';
import { CategoryService } from 'src/app/shared/services/category.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  public idSubCategory!: string | null;
  public products!: Product[];
  public subscription: Subscription = new Subscription();
  constructor(private activatedRoute: ActivatedRoute,
              private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap)=>{
      if(paramMap.get('subCategory')){
        this.idSubCategory = paramMap.get('subCategory');
        this.subscription = this.categoryService.getProductOfSubCategory(this.idSubCategory).subscribe((data: Product[])=>{
          if(data){
            this.products = data;
          }else{
            throw new Error("no data");
            
          }
        })
      }
    })
  }

}
