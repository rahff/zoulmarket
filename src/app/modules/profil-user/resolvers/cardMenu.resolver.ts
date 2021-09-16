import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { UserService } from "src/app/services/user.service";
import { DataMenuProfilUser } from "src/app/shared/models/user.model";

@Injectable()
export class CardMenuResolver implements Resolve<DataMenuProfilUser[]> {
    constructor(private user: UserService){}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<DataMenuProfilUser[]>{
        return this.user.getDataMenuProfilUser()
    }

}