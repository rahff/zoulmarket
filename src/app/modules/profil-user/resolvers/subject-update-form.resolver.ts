import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable, of } from "rxjs";
import { first } from "rxjs/operators";

import { DataMenuProfilUser } from "src/app/shared/models/user.model";

@Injectable()
export class SubjectResolver implements Resolve<string | null> {
    constructor(){}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<string | null>{
      return  of(route.paramMap.get('subject')).pipe(
          first()
      )
    }

}