import { Routes } from "@angular/router";
import { CheckoutComponent } from "./checkout/checkout.component";
import { PanierComponent } from "./panier/panier.component";


export const CHECKOUT_ROUTES: Routes = [
    {
        path: "", component: PanierComponent
    },
    {
        path: "checkout", component: CheckoutComponent
    }
]