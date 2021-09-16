import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "src/app/services/auth.service";
import { User } from "src/app/shared/models/user.model";

@Injectable()
export class UserInfosResolver implements Resolve<User | null> {
    constructor(private auth: AuthService){}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User | null>{
        const id = route.paramMap.get('userId');
        return this.auth.getUserInfo(id)
    }

}