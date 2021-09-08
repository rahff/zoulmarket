import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { CategoryService } from 'src/app/services/category.service';
import { Product } from 'src/app/shared/models/product';
import { SubCategory } from 'src/app/shared/models/sub-category.model';

@Component({
  selector: 'app-menu-category',
  templateUrl: './menu-category.component.html',
  styleUrls: ['./menu-category.component.css']
})
export class MenuCategoryComponent implements OnInit, OnDestroy {
  public onScreen: boolean = false;
  public products!: Product[];
  public subCategories!: SubCategory[]
  constructor(private activatedRoute: ActivatedRoute,
              private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.onScreen = true;
    this.subCategories = this.activatedRoute.snapshot.data['subCategories'];
    this.products = this.activatedRoute.snapshot.data['products'];
  }
  ngOnDestroy(): void {
    this.onScreen = false;
  }

}
