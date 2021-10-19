import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Product } from '../shared/models/product';
import { Variation } from '../shared/models/variation.model';



@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private API_URL = environment.URL_API;
  public PromoSubject = new BehaviorSubject<Product[] | null>(null)
  constructor(private http: HttpClient) {}

  getProductPromo(): Observable<Product[]> {
    return this.http.get<any>(this.API_URL + 'promo').pipe(
      map((data: any) => {
        return data.products;
      }),
      map((data: any) => {
        const arrayProducts: Product[] = [];
        for (let i = 0; i < data.length; i++) {
          const imgs = this.extractUrlOfData(data, i);
          const product: Product = {
            name: data[i].name,
            description: data[i].description,
            id: data[i]._id,
            img: imgs,
            price: data[i].price,
            vendeur: data[i].vendeur,
            FNSKU: data[i].FNSKU
          };
          arrayProducts.push(product);
        }
        this.PromoSubject.next(arrayProducts)
        return arrayProducts;
      })
    );
  }
  getProductById(id: string | null): Observable<Product> {
    return this.http.get<any>(this.API_URL + 'products/' + id).pipe(
      map((data: any) => {    
        const imgs: any[] = this.extractUrlOfData(data, null);
        const variations = this.extractVariations(data.dataProduct.variations);      
        this.clearDataProduct(data.dataProduct.characteristics);
        this.clearDataProduct(data.dataProduct.pointures);
        this.clearDataProduct(data.dataProduct.sizes);
        this.clearDataProduct(data.dataProduct.sizes_XXS_TO_XXXL);
        const product: Product = {
          name: data.name,
          price: data.price,
          vendeur: data.vendeur,
          img: imgs,
          description: data.description,
          id: data._id,
          store: data.store._id,
          characteristics: data.dataProduct.characteristics,
          pointures: data.dataProduct.pointures,
          variations: variations,
          sizes: data.dataProduct.sizes,
          sizes_XXS_TO_XXXL: data.dataProduct.sizes_XXS_TO_XXXL,
          stock: data.stock,
          FNSKU: data.FNSKU
                };
        return product;
      })
    );
  }
  extractVariations(data: any[]): Variation[] {
    const result: Variation[] = [];
    for (let i = 0; i < data.length; i++) {
      const variation: Variation = {
        name: data[i].name,
        description: data[i].description,
        img: this.extractUrlOfData(data, i),
        price: data[i].price,
        id: data[i]._id,
        stock: data[i].stock,
        FNSKU: data[i].FNSKU
      };
      result.push(variation);
    }
    return result;
  }
  extractUrlOfData(data: any[] | any, index: number | null): string[] {
    const result: any[] = [];
    if (index !== null) {
      data[index].img.forEach((el: any) => {
        result.push({
          img_big: el.url,
          img_md: el.formats.small?.url || el.formats.thumbnail?.url,
          img_mini: el.formats.thumbnail.url,
        });
      });
      return result;
    } else {
      data.img.forEach((el: any) => {
        result.push({
          img_big: el.url,
          img_md: el.formats.small?.url || el.formats.thumbnail?.url,
          img_mini: el.formats.thumbnail.url,
        });
      });
      return result;
    }
  }
  clearDataProduct(data: any): void {
    for (const key in data) {
      if(key === "id" || key === "_id" || key === "__v")
        delete data[key];
        
    }
  }
}
