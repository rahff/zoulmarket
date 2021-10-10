import { Routes } from "@angular/router";
import { HomeCategoriesResolver } from "../resolvers/home-categories.resolver";
import { HomeProductsResolver } from "../resolvers/home-products.resolver";
import { HomeStoresResolver } from "../resolvers/home-stores.resolver";
import { HomeComponent } from "./home.component";

export const HOME_ROUTES: Routes = [
    
    {
        path: "", component: HomeComponent, resolve: {
            products: HomeProductsResolver,
            categories: HomeCategoriesResolver,
            stores: HomeStoresResolver
          }
    },
]