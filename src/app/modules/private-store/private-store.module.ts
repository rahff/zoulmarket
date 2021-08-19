import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomeStoreComponent } from './home-store/home-store.component';
import { PRIVATE_STORE_ROUTES } from './private-store.routes';



@NgModule({
  declarations: [
      HomeStoreComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(PRIVATE_STORE_ROUTES)
  ]
})
export class PrivateStoreModule { }
