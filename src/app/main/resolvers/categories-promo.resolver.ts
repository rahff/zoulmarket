import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable, of } from "rxjs";
import { first } from "rxjs/operators";
import { CategoryService } from "../../services/category.service";
import { Product } from "../../shared/models/product";



@Injectable()
export class CategoiesPromoResolver implements Resolve<Product[] | null> {
    constructor(private category: CategoryService){        
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Product[] | null>{
        const id = state.url.split('/boutique/products/')[1]
        if(id){
            return this.category.getPromoOfCategory(id).pipe(
                first()
            )
        }else{
            return of(null)
        }
    }
}