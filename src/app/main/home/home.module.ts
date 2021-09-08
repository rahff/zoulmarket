import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';
import { HOME_ROUTES } from './home.routes';
import { CarouselComponent } from './carousel/carousel.component';
import { LoadingModule } from 'src/app/shared/loading/loading.module';



@NgModule({
  declarations: [
    HomeComponent,
    CarouselComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(HOME_ROUTES),
    LoadingModule
  ]
})
export class HomeModule { }
