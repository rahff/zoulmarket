import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';
import { HOME_ROUTES } from './home.routes';
import { CarouselComponent } from './carousel/carousel.component';
import { LoadingModule } from 'src/app/shared/loading/loading.module';
import { HomeProductsResolver } from '../resolvers/home-products.resolver';
import { HomeCategoriesResolver } from '../resolvers/home-categories.resolver';
import { HomeStoresResolver } from '../resolvers/home-stores.resolver';



@NgModule({
  declarations: [
    HomeComponent,
    CarouselComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(HOME_ROUTES),
    LoadingModule
  ], providers: [
    HomeProductsResolver,
    HomeCategoriesResolver,
    HomeStoresResolver
  ]
})
export class HomeModule { }
