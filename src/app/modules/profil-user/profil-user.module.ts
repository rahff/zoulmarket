import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { LoadingModule } from 'src/app/shared/loading/loading.module';
import { MainComponent } from './main/main.component';
import { RouterModule } from '@angular/router';
import { PROFIL_ROUTES } from './profil.routes';
import { CardMenuResolver } from './resolvers/cardMenu.resolver';
import { CommandesComponent } from './commandes/commandes.component';
import { ContactComponent } from './contact/contact.component';
import { SecurityComponent } from './security/security.component';
import { UserInfosComponent } from './security/user-infos/user-infos.component';
import { FormUpdateInfosUserComponent } from './security/form-update-infos-user/form-update-infos-user.component';
import { UserResolver } from './resolvers/user.resolver';
import { SubjectResolver } from './resolvers/subject-update-form.resolver';
import { AvisComponent } from './commandes/avis/avis.component';
import { ListComponent } from './commandes/list/list.component';



@NgModule({
  declarations: [
    MainComponent,
    CommandesComponent,
    ContactComponent,
    SecurityComponent,
    UserInfosComponent,
    FormUpdateInfosUserComponent,
    AvisComponent,
    ListComponent
  ],
  imports: [
    SharedModule,
    LoadingModule,
    RouterModule.forChild(PROFIL_ROUTES)
  ],
  providers: [
    CardMenuResolver,
    UserResolver,
    SubjectResolver
  ]
})
export class ProfilUserModule { }
