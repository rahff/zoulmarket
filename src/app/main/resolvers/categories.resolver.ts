import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable, of } from "rxjs";
import { first } from "rxjs/operators";
import { CategoryService } from "../../services/category.service";
import { SubCategory } from "../../shared/models/sub-category.model";


@Injectable()
export class CategoiesResolver implements Resolve<SubCategory[] | null> {
    constructor(private category: CategoryService){        
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<SubCategory[] | null>{
       const id = state.url.split('/boutique/products/')[1]
       
       if(id){
           return this.category.getSubCategoryOfCategory(id).pipe(
               first()
           )
       }else{
          return of(null)
       }
    }
}