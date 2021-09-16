import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { first } from 'rxjs/operators'
import { UserService } from "src/app/services/user.service";
import { User } from "src/app/shared/models/user.model";

@Injectable()
export class UserResolver implements Resolve<User | null> {
    constructor(private user: UserService){}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User | null>{
        return this.user.user$.pipe(
            first()
        )
    }

}