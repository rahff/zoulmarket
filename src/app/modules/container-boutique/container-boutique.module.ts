import { NgModule } from '@angular/core';
import { MenuCategoryComponent } from './menu-category/menu-category.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { BOUTIQUE_ROUTES } from './boutique.routes';






@NgModule({
  declarations: [
    MenuCategoryComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(BOUTIQUE_ROUTES)
  ]
})
export class ContainerBoutiqueModule { }
