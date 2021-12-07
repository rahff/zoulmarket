import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { CarouselComponent } from './carousel/carousel.component';
import { FeaturetteComponent } from '../featurette/featurette.component';
import { HomeRoutingModule } from './home-routing.module';
import { CoreModule } from 'src/app/core/core.module';



@NgModule({
  declarations: [
    ...HomeRoutingModule.component,
    CarouselComponent,
    FeaturetteComponent
  ],
  imports: [
    SharedModule,
    HomeRoutingModule
  ], 
  providers: HomeRoutingModule.resolver
})
export class HomeModule { }
