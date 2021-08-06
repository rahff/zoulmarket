import { NgModule } from '@angular/core';
import { MenuCategoryComponent } from './menu-category/menu-category.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { CATEGORY_ROUTES } from '../menu-category.routes';
import { ProductListComponent } from './product-list/product-list.component';



@NgModule({
  declarations: [
    MenuCategoryComponent,
    ProductListComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(CATEGORY_ROUTES)
  ]
})
export class ContainerBoutiqueModule { }
