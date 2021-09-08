import { Routes } from "@angular/router";
import { ProductResolver } from "src/app/modules/container-boutique/resolver/product.resolver";
import { ProductPageComponent } from "../container-boutique/product-page/product-page.component";
import { HomeStoreComponent } from "./home-store/home-store.component";

export const PRIVATE_STORE_ROUTES: Routes = [
    {
        path: "",  component: HomeStoreComponent
    },
    {
        path: "product/:id", component: ProductPageComponent, 
        resolve: {
            product: ProductResolver
        }
    }
]