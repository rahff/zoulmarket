import { NgModule } from '@angular/core';
import { PanierComponent } from './panier/panier.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { CHECKOUT_ROUTES } from './checkout.routes';
import { LoadingModule } from 'src/app/shared/loading/loading.module';
import { NgxPayPalModule } from 'ngx-paypal';


@NgModule({
  declarations: [
    PanierComponent,
    CheckoutComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(CHECKOUT_ROUTES),
    LoadingModule,
    NgxPayPalModule
  ]
})
export class CheckoutModule { }
