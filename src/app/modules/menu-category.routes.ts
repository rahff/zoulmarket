import { Routes } from "@angular/router";
import { MenuCategoryComponent } from "./container-boutique/menu-category/menu-category.component";
import { ProductListComponent } from "./container-boutique/product-list/product-list.component";

export const CATEGORY_ROUTES: Routes = [
    {
        path:"", component: MenuCategoryComponent
    },
    {
        path: "products/:category", component: ProductListComponent
    }
]