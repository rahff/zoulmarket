import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable, of } from "rxjs";
import { first } from "rxjs/operators";
import { CategoryService } from "src/app/services/category.service";
import { SubCategory } from "src/app/shared/models/sub-category.model";


@Injectable({
    providedIn: "root"
})
export class CategoryResolver implements Resolve<SubCategory[] | null> {
    constructor(private categoryDervice: CategoryService){}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<SubCategory[] | null> {
        const id = route.paramMap.get('category')
        if(id){
            return this.categoryDervice.getCategoryById(id).pipe(
                first()
            )
        }else{
            return of(null)
        }
    }
}