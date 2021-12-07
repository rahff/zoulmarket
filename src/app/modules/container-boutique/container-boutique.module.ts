import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { BoutiqueRoutingModule } from './boutique-routing.module';





@NgModule({
  declarations: BoutiqueRoutingModule.components,
  imports: [
    SharedModule,
    BoutiqueRoutingModule,
  ],
  providers: BoutiqueRoutingModule.resolvers
})
export class ContainerBoutiqueModule { }
