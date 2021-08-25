import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/shared/models/product';
import { SubCategory } from 'src/app/shared/models/sub-category.model';
import { CategoryService } from 'src/app/shared/services/category.service';

@Component({
  selector: 'app-menu-category',
  templateUrl: './menu-category.component.html',
  styleUrls: ['./menu-category.component.css']
})
export class MenuCategoryComponent implements OnInit {
  public products!: Product[];
  public subCategories!: SubCategory[]
  public idCategory: string | undefined | null;
  private subscription: Subscription = new Subscription()
  constructor(private activatedRoute: ActivatedRoute,
              private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap)=>{
      if(paramMap.get('category')){
        this.idCategory = paramMap.get('category');
        this.subscription.add(this.categoryService.getSubCategoryOfCategory(this.idCategory).subscribe((data: SubCategory[])=>{
          if(data){
            this.subCategories = data
            this.subscription.add(this.categoryService.getPromoOfCategory(this.idCategory).subscribe((data)=>{
              this.products = data
            }))
          }else{
            throw new Error("no data");
          }
        }))
      }
    })
  }


}
