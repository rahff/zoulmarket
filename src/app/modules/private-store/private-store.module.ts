import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoadingModule } from 'src/app/shared/loading/loading.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductResolver } from '../container-boutique/resolver/product.resolver';
import { HomeStoreComponent } from './home-store/home-store.component';
import { PRIVATE_STORE_ROUTES } from './private-store.routes';



@NgModule({
  declarations: [
      HomeStoreComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(PRIVATE_STORE_ROUTES),
    LoadingModule
  ],
  providers: [
    ProductResolver
  ]
})
export class PrivateStoreModule { }
