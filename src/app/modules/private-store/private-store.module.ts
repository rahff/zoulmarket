import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';
import { StoresRoutingModule } from './stores-routing.module';



@NgModule({
  declarations: StoresRoutingModule.components,
  imports: [
    SharedModule,
    StoresRoutingModule,
  ],
  providers: [
  ]
})
export class PrivateStoreModule { }
