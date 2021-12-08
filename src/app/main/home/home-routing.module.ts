import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeCategoriesResolver } from '../resolvers/home-categories.resolver';
import { HomeProductsResolver } from '../resolvers/home-products.resolver';
import { HomeStoresResolver } from '../resolvers/home-stores.resolver';
import { HomeComponent } from './home.component';




const routes: Routes = [
    {
        path: "", component: HomeComponent, resolve: {
            products: HomeProductsResolver,
            stores: HomeStoresResolver
          }
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  providers: [
  ],
  exports: [RouterModule]
})
export class HomeRoutingModule { 
    static component = [HomeComponent]
    static resolver = [HomeStoresResolver, HomeProductsResolver]
}
