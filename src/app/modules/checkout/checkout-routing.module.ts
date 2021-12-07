import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/services/auth.guard';
import { CheckoutComponent } from './checkout/checkout.component';
import { PanierComponent } from './panier/panier.component';


const routes: Routes = [
    {
        path: "", component: PanierComponent, canActivate: [AuthGuard]
    },
    {
        path: "checkout", component: CheckoutComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  providers: [
  ],
  exports: [RouterModule]
})
export class CheckoutRoutingModule { 
    static components = [PanierComponent, CheckoutComponent];
    static providers = [AuthGuard]
}
