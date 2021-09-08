import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable, of } from "rxjs";
import { first } from "rxjs/operators";
import { CategoryService } from "src/app/services/category.service";
import { Product } from "src/app/shared/models/product";

@Injectable()
export class ProductListResolver implements Resolve<Product[] | null>{

    constructor(private categoryService: CategoryService){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Product[] | null>{
        const id = route.paramMap.get("subCategory");
        if(id){
            return this.categoryService.getProductOfSubCategory(id).pipe(
                first()
            )
        }else{
            return of(null)
        }
    }
}