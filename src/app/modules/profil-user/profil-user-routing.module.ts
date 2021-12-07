import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AvisComponent } from './commandes/avis/avis.component';
import { CommandesComponent } from './commandes/commandes.component';
import { ListComponent } from './commandes/list/list.component';
import { ContactComponent } from './contact/contact.component';
import { MainComponent } from './main/main.component';
import { CardMenuResolver } from './resolvers/cardMenu.resolver';
import { SubjectResolver } from './resolvers/subject-update-form.resolver';
import { UserResolver } from './resolvers/user.resolver';
import { FormUpdateInfosUserComponent } from './security/form-update-infos-user/form-update-infos-user.component';
import { SecurityComponent } from './security/security.component';
import { UserInfosComponent } from './security/user-infos/user-infos.component';

const routes: Routes = [
    {
        path: ":userId", component: MainComponent, resolve: {
            userInfos: UserResolver,
            cardsMenu: CardMenuResolver
        }
    },
    {
        path: "commandes/:userId", component: CommandesComponent, children: [
            {
                path:"", pathMatch: "full", component: ListComponent
            },
            {
                path:"avis", component: AvisComponent
            }
        ]
    },
    {
        path: "contact/:userId", component: ContactComponent
    },
    {
        path: "security/:userId", component: SecurityComponent, children: [
            {
                path: "",pathMatch: 'full', component: UserInfosComponent, resolve: {
                    user: UserResolver
                }
            },
            {
                path: "update/:subject", component: FormUpdateInfosUserComponent, resolve: {
                    subject: SubjectResolver
                }
            }
        ]
    }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  providers: [
  ],
  exports: [RouterModule]
})
export class ProfilUserRoutingModule { 
    static components = [FormUpdateInfosUserComponent, UserInfosComponent, SecurityComponent, ContactComponent, AvisComponent, CommandesComponent, MainComponent, ListComponent];
    static resolvers = [SubjectResolver, UserResolver, CardMenuResolver, UserResolver]
}
