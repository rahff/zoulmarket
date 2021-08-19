import { NgModule } from '@angular/core';
import { PanierComponent } from './panier/panier.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { CHECKOUT_ROUTES } from './checkout.routes';



@NgModule({
  declarations: [
    PanierComponent,
    CheckoutComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(CHECKOUT_ROUTES)
  ]
})
export class CheckoutModule { }
