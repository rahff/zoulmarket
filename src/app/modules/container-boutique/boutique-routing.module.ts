import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuCategoryComponent } from './menu-category/menu-category.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { CategoryResolver } from './resolver/category.resolver';
import { ProductResolver } from './resolver/product.resolver';
import { ProductListResolver } from './resolver/productList.resolver';
import { WrapperShopComponent } from './wrapper-shop/wrapper-shop.component';





const routes: Routes = [
    {
        path:"", component: WrapperShopComponent, children: [
            {
                path: "product/:id", component: ProductPageComponent
            },
            {
                path: "products/:category", component: MenuCategoryComponent, resolve: {
                    dataCategory: CategoryResolver
                }
            },
            {
                path: "products/list/:subCategory", component: ProductListComponent,
                resolve: {
                    products: ProductListResolver
                }
            }
        ]
    },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  providers: [
  ],
  exports: [RouterModule]
})
export class BoutiqueRoutingModule { 
    static components = [WrapperShopComponent, ProductPageComponent, MenuCategoryComponent, ProductListComponent];
    static resolvers = [ProductListResolver, CategoryResolver, ProductResolver];
}
