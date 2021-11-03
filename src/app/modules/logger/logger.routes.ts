import { Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { ResetPasswordComponent } from "./reset-password/reset-password.component";

export const LOGGER_ROUTES: Routes = [
    {
        path: "", component: LoginComponent
    },
    {
        path: "inscription", component: RegisterComponent
    },
    {
        path: "reset-password", component: ResetPasswordComponent
    }
]