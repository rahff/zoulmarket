import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Product } from '../shared/models/product';
import { Variation } from '../shared/models/variation.model';
import { CoreModule } from '../core/core.module';

@Injectable({
  providedIn: CoreModule,
})
export class ProductService {
  private API_URL = environment.URL_API;
  public PromoSubject = new BehaviorSubject<Product[] | null>(null);
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
            FNSKU: data[i].FNSKU,
            avis: data[i].avis,
            tailles: null
          };
          arrayProducts.push(product);
        }
        this.PromoSubject.next(arrayProducts);
        return arrayProducts;
      })
    );
  }
  getProductById(id: string | null): Observable<Product> {
    return this.http.get<any>(this.API_URL + 'products/' + id).pipe(
      map((data: any) => {
        console.log(data);
        const imgs: any[] = this.extractUrlOfData(data, null);
        const variations = this.extractVariations(data.variations);
        const characteristics: string[] =  this.extractCharacteristics(data.caracteristiques);
        let tailles = null;
        if(data.Tailles){
          tailles = this.sanitizeData(data.Tailles);
          tailles = this.extractTaillesOfProduct(data.Tailles);
        }
        const product: Product = {
          name: data.name,
          FNSKU: data.FNSKU,
          avis: data.avis,
          description: data.description,
          id: data._id,
          img: imgs,
          price: data.price,
          vendeur: data.vendeur,
          characteristics: characteristics,
          stock: data.stock,
          store: data.store.id ? data.store.id : "no store",
          variations: variations,
          tailles: tailles,
        };
        return product;
      })
    );
  }
  sanitizeData(data: any): any {
    if(data){
      delete data['id'];
      delete data['_id'];
      delete data['__v'];
    }
    return data
  }
  extractTaillesOfProduct(data: any): string[]{
    const result: string[] = [];
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        if(data[key]){
          const size = data[key];
          result.push(size)
        }
      }
    }
    return result;
  }
  extractCharacteristics(data: any): string[]{
    const regex = /item[1-5]/;
    const result: string[] = []
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        if(key.match(regex)){
          result.push(data[key])
        }
      }
    }
    return result;
  }
  extractVariations(data: any[]): Variation[] {
    const result: Variation[] = [];
    for (let i = 0; i < data.length; i++) {
      const variation: Variation = {
        img: data[i].img.formats.thumbnail.url,
        linkId: data[i].product._id
      };
      result.push(variation);
    }
    return result;
  }
  addRatingComponentOnProduct(body: any): Observable<boolean> {
    return this.http.post(this.API_URL + 'avis', body).pipe(
      map((response: any) => {
        console.log(response);
        return true;
      })
    );
  }
  extractUrlOfData(data: any[] | any, index: number | null): any[] {
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
}
