import { Routes } from "@angular/router";
import { CommandesComponent } from "./commandes/commandes.component";
import { ContactComponent } from "./contact/contact.component";
import { MainComponent } from "./main/main.component";
import { CardMenuResolver } from "./resolvers/cardMenu.resolver";
import { SubjectResolver } from "./resolvers/subject-update-form.resolver";
import { UserResolver } from "./resolvers/user.resolver";
import { UserInfosResolver } from "./resolvers/userInfos.resolver";
import { FormUpdateInfosUserComponent } from "./security/form-update-infos-user/form-update-infos-user.component";
import { SecurityComponent } from "./security/security.component";
import { UserInfosComponent } from "./security/user-infos/user-infos.component";

export const PROFIL_ROUTES: Routes = [
    {
        path: ":userId", component: MainComponent, resolve: {
            userInfos: UserInfosResolver,
            cardsMenu: CardMenuResolver
        }
    },
    {
        path: "commandes/:userId", component: CommandesComponent
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