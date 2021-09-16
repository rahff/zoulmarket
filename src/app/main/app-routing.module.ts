import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoiesPromoResolver } from './resolvers/categories-promo.resolver';
import { CategoiesResolver } from './resolvers/categories.resolver';
import { HomeCategoriesResolver } from './resolvers/home-categories.resolver';
import { HomeProductsResolver } from './resolvers/home-products.resolver';
import { HomeStoresResolver } from './resolvers/home-stores.resolver';
import { StoreResolver } from './resolvers/store.resolver';



const routes: Routes = [
  {
    path: "", pathMatch: "full", loadChildren: ()=> import('./home/home.module').then(m => m.HomeModule),
    resolve: {
      products: HomeProductsResolver,
      categories: HomeCategoriesResolver,
      stores: HomeStoresResolver
    }
  },
  {
    path: "boutique", loadChildren: ()=> import('../modules/container-boutique/container-boutique.module').then(m => m.ContainerBoutiqueModule),
    resolve: {
      subCategories: CategoiesResolver,
      products: CategoiesPromoResolver
    }
  },
  {
    path: "connection", loadChildren: ()=> import('../modules/logger/logger.module').then(m => m.LoggerModule)
  },
  {
    path: "boutiques/:id", loadChildren: ()=> import('../modules/private-store/private-store.module').then(m => m.PrivateStoreModule),
    resolve: {
     store: StoreResolver
    }
  },
  {
    path: "panier", loadChildren: ()=> import('../modules/checkout/checkout.module').then(m => m.CheckoutModule)
  },
  {
    path: "profil", loadChildren: ()=> import('../modules/profil-user/profil-user.module').then(m => m.ProfilUserModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [
    HomeProductsResolver,
    HomeCategoriesResolver,
    HomeStoresResolver,
    CategoiesResolver,
    CategoiesPromoResolver,
    StoreResolver
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
