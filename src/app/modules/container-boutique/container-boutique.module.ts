import { NgModule } from '@angular/core';
import { MenuCategoryComponent } from './menu-category/menu-category.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { BOUTIQUE_ROUTES } from './boutique.routes';
import { LoadingModule } from 'src/app/shared/loading/loading.module';
import { ProductListResolver } from './resolver/productList.resolver';
import { ProductResolver } from './resolver/product.resolver';








@NgModule({
  declarations: [
    MenuCategoryComponent,
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
