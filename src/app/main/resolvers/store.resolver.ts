import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable, of } from "rxjs";
import { first } from "rxjs/operators";
import { StoreService } from "src/app/services/store.service";
import { Store } from "src/app/shared/models/store";


@Injectable()
export class StoreResolver implements Resolve<Store | null>{

    constructor(private storeService: StoreService){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Store | null>{
        const id = route.paramMap.get('id');
        if(id){
            return this.storeService.getStoreById(id).pipe(
                first()
            );
        }else{
           return of(null)
        }
    }
}