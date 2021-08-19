import { Routes } from "@angular/router";

import { MenuCategoryComponent } from "./menu-category/menu-category.component";
import { ProductListComponent } from "./product-list/product-list.component";
import { ProductPageComponent } from "./product-page/product-page.component";



export const BOUTIQUE_ROUTES: Routes = [
    {
        path:"", component: MenuCategoryComponent
    },
    {
        path: "product/:id", component: ProductPageComponent
    },
    {
        path: "products/:category", component: MenuCategoryComponent
    },
    {
        path: "products/list/:subCategory", component: ProductListComponent
    }
]