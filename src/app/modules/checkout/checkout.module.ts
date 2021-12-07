import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { CheckoutRoutingModule } from './checkout-routing.module';





@NgModule({
  declarations: CheckoutRoutingModule.components,
  imports: [
    SharedModule,
    CheckoutRoutingModule,
  ],
  
})
export class CheckoutModule { }
