import { Routes } from "@angular/router";
import { ProductPageComponent } from "../container-boutique/product-page/product-page.component";
import { HomeStoreComponent } from "./home-store/home-store.component";

export const PRIVATE_STORE_ROUTES: Routes = [
    {
        path: "", pathMatch: "full", component: HomeStoreComponent, children: [
            {
                path: ""
            }
        ]
    },
    {
        path: "product/:id", component: ProductPageComponent
    }
]