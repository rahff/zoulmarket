import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CategoryService } from 'src/app/services/category.service';
import { Product } from 'src/app/shared/models/product';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {

  public onScreen: boolean = false;
  public products!: Product[];
  private id: string | null = null;
  // public subscription: Subscription = new Subscription();
  constructor(private activatedRoute: ActivatedRoute,
              private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.onScreen = true;
    this.products = this.activatedRoute.snapshot.data["products"];

}
  ngOnDestroy(): void {
    this.onScreen = false;
  }
}
