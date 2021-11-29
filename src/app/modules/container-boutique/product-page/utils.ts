import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Product } from 'src/app/shared/models/product';
import { Variation } from 'src/app/shared/models/variation.model';

export function defineSizeOfProduct(product: Product | null): {
  sizeMode: 'Taille' | 'Pointure' | null;
  currentSize: any[] | null;
} {
  if(product){
  let sizeMode: 'Taille' | 'Pointure' | null = null;
  let currentSize: any[] | null = null;
  if (product.pointures) {
    sizeMode = 'Pointure';
    currentSize = product.pointures;
    return { sizeMode, currentSize };
  } else if (product.sizes) {
    sizeMode = 'Taille';
    currentSize = product.sizes;
    return { sizeMode, currentSize };
  } else if (product.sizes_XXS_TO_XXXL) {
    sizeMode = 'Taille';
    currentSize = product.sizes_XXS_TO_XXXL;
    return { sizeMode, currentSize };
  }
  if (!product.pointures && !product.sizes && !product.sizes_XXS_TO_XXXL) {
    (sizeMode = null), (currentSize = null);
  }
  return { currentSize, sizeMode };
}else{
  return { sizeMode: null, currentSize: null}
}
}
export function isVariable(product: Product): boolean {
  if (!product.variations) {
    return false;
  } else {
    return true;
  }
}
@Injectable({
  providedIn: 'root',
})
export class VariationService {
  public variation$: Subject<{
    variation: Variation;
    index: number;
  } | null> = new Subject<{
    variation: Variation;
    index: number;
  } | null>();
  public size$: BehaviorSubject<any> = new BehaviorSubject(null);
  constructor() {}
  changeVariationData(obj: { variation: Variation; index: number }): void {
    this.variation$.next({ variation: obj.variation, index: obj.index });
  }
  setSizeForProduct(size: any): void {
    this.size$.next(size);
  }
}
