import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProfilUserRoutingModule } from './profil-user-routing.module';



@NgModule({
  declarations: ProfilUserRoutingModule.components,
  imports: [
    SharedModule,
    ProfilUserRoutingModule
  ],
  providers: ProfilUserRoutingModule.resolvers
})
export class ProfilUserModule { }
