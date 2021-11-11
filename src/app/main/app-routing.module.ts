import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../services/auth.guard';
import { CategoiesPromoResolver } from './resolvers/categories-promo.resolver';
import { CategoiesResolver } from './resolvers/categories.resolver';

import { StoreResolver } from './resolvers/store.resolver';



const routes: Routes = [
  {
    path: "", pathMatch: "full", loadChildren: ()=> import('./home/home.module').then(m => m.HomeModule)
  },
  {
    path: "boutique", loadChildren: ()=> import('../modules/container-boutique/container-boutique.module').then(m => m.ContainerBoutiqueModule),
    resolve: {
      subCategories: CategoiesResolver,
      products: CategoiesPromoResolver
    }
  },
  {
    path: "connexion", loadChildren: ()=> import('../modules/logger/logger.module').then(m => m.LoggerModule)
  },
  {
    path: "boutiques/:id", loadChildren: ()=> import('../modules/private-store/private-store.module').then(m => m.PrivateStoreModule),
    resolve: {
     store: StoreResolver
    }
  },
  {
    path: "panier", loadChildren: ()=> import('../modules/checkout/checkout.module').then(m => m.CheckoutModule), 
  },
  {
    path: "profil", loadChildren: ()=> import('../modules/profil-user/profil-user.module').then(m => m.ProfilUserModule), canLoad: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: "top", anchorScrolling: 'enabled'})],
  providers: [
    CategoiesResolver,
    CategoiesPromoResolver,
    StoreResolver
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
