import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable, of } from "rxjs";
import { first } from "rxjs/operators";
import { ProductService } from "src/app/services/product.service";
import { Product } from "src/app/shared/models/product";


@Injectable()
export class ProductResolver implements Resolve<Product | null>{
    constructor(private product: ProductService){}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Product | null>{
        const id = route.paramMap.get('id')
        if(id){
            return this.product.getProductById(id).pipe(
                first()
            )
        }else{
            return of(null)
        }
    }
}