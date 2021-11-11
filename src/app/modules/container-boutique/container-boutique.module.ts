import { NgModule } from '@angular/core';
import { MenuCategoryComponent } from './menu-category/menu-category.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { BOUTIQUE_ROUTES } from './boutique.routes';
import { LoadingModule } from 'src/app/shared/loading/loading.module';
import { ProductListResolver } from './resolver/productList.resolver';
import { ProductResolver } from './resolver/product.resolver';
import { WrapperShopComponent } from './wrapper-shop/wrapper-shop.component';
import { DescriptionComponent } from './product-page/description/description.component';
import { GalleryComponent } from './product-page/gallery/gallery.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { VariationComponent } from './product-page/description/variation/variation.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ChangeQuantityComponent } from './product-page/description/change-quantity/change-quantity.component';




@NgModule({
  declarations: [
    MenuCategoryComponent,
    WrapperShopComponent,
    ProductPageComponent,
    GalleryComponent,
    DescriptionComponent,
    VariationComponent,
    ProductListComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(BOUTIQUE_ROUTES),
    LoadingModule
  ],
  providers: [
    ProductListResolver,
    ProductResolver
  ]
})
export class ContainerBoutiqueModule { }
