import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Product } from "src/app/shared/models/product";
import { Variation } from "src/app/shared/models/variation.model";

export  function defineSizeOfProduct(product: Product): {sizeMode: "Taille" | "Pointure" | null, currentSize: any[] | null }{
    let sizeMode:"Taille" | "Pointure" | null = null;
    let currentSize: any[] | null = null;
    if(product.pointures){
        sizeMode = "Pointure";
        currentSize = product.pointures;
        return {sizeMode, currentSize}
      }else if(product.sizes){
        sizeMode = "Taille";
        currentSize = product.sizes
        return {sizeMode, currentSize}
      }else if(product.sizes_XXS_TO_XXXL){
          sizeMode = "Taille";    
          currentSize = product.sizes_XXS_TO_XXXL
          return {sizeMode, currentSize}
        }
        if(!product.pointures && !product.sizes && !product.sizes_XXS_TO_XXXL){
            sizeMode = null,
            currentSize = []
          }
   return { currentSize, sizeMode }
}
export function isVariable(product: Product): boolean {
      
    if(!product.variations){
        return false;
    }else {
        return true;
    }
}
@Injectable({
    providedIn: 'root'
})
export class VariationService {

    public variation$:BehaviorSubject<{variation: Variation, index: number} | null> = new BehaviorSubject<{variation: Variation, index: number} | null>(null);
    public size$: BehaviorSubject<any> = new BehaviorSubject(null);
    constructor(){}
    changeVariationData(obj: { variation: Variation, index: number}): void{
          this.variation$.next({variation: obj.variation, index: obj.index})
      }
      setSizeForProduct(size: any): void {
       this.size$.next(size);
      }
}