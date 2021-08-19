import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';
import { CircleContainerComponent } from './components/circle-container/circle-container.component';
import { RouterModule } from '@angular/router';
import { ActiveDirective } from './directive/active.directive';
import { CardProductComponent } from '../modules/container-boutique/card-product/card-product.component';
import { ProductListComponent } from '../modules/container-boutique/product-list/product-list.component';
import { ChangeQuantityComponent } from '../modules/container-boutique/product-page/description/change-quantity/change-quantity.component';
import { DescriptionComponent } from '../modules/container-boutique/product-page/description/description.component';
import { GalleryComponent } from '../modules/container-boutique/product-page/gallery/gallery.component';
import { VariationComponent } from '../modules/container-boutique/product-page/description/variation/variation.component';
import { ProductPageComponent } from '../modules/container-boutique/product-page/product-page.component';




@NgModule({
  declarations: [
    CardProductComponent,
    ProductPageComponent,
    GalleryComponent,
    DescriptionComponent,
    CircleContainerComponent,
    ProductListComponent,
    ActiveDirective,
    VariationComponent,
    ChangeQuantityComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    RouterModule
  ],
  exports: [
    CommonModule,
    CardProductComponent,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    ProductPageComponent,
    GalleryComponent,
    DescriptionComponent,
    CircleContainerComponent,
    ProductListComponent,
    ActiveDirective,
    ChangeQuantityComponent
  ],
  
  
})
export class SharedModule { }