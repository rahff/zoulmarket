import { Routes } from "@angular/router";
import { AuthGuard } from "src/app/services/auth.guard";
import { CheckoutComponent } from "./checkout/checkout.component";
import { PanierComponent } from "./panier/panier.component";


export const CHECKOUT_ROUTES: Routes = [
    {
        path: "", component: PanierComponent, canActivate: [AuthGuard]
    },
    {
        path: "checkout", component: CheckoutComponent
    }
]