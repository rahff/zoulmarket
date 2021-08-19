import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product';
import { Store } from '../models/store';
import { SubCategory } from '../models/sub-category.model';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private URL_API = environment.URL_API;
  constructor(private http: HttpClient) {}

  getStoresPromo(): Observable<Store[]> {
    return this.http.get(this.URL_API + 'home-stores').pipe(
      map((data: any) => {
        return data.stores;
      }),
      map((data: any) => {
        const all: Store[] = [];
        for (let i = 0; i < data.length; i++) {
          const store: Store = {
            id: data[i]._id,
            img: data[i].img[0].formats.thumbnail.url,
            name: data[i].name,
            banner_desktop: data[i].banner_desktop.url,
            banner_mobile: data[i].banner_mobile.url
          };
          all.push(store);
        }
        return all;
      })
    );
  }
  getStoreById(id: string | null): Observable<Store> {
    return this.http.get(this.URL_API + 'stores/' + id).pipe(
      map((data: any) => {
        const productOfStore: Product[] = [];
        const arraySubCategory: SubCategory[] = []
        for (let i = 0; i < data.sous_categories.length; i++) {
          const subCategory: SubCategory = {
            id: data.sous_categories[i]._id,
            img: data.sous_categories[i].img.formats.thumbnail.url,
            name: data.sous_categories[i].name
          }
          arraySubCategory.push(subCategory)
        }
        for (let i = 0; i < data.products.length; i++) {
          const imgs = this.extractUrlOfData(data.products, i);
          const product: Product = {
          
            description: data.products[i].description,
            id: data.products[i]._id,
            img: imgs,
            name: data.products[i].name,
            price: data.products[i].price,
            vendeur: data.products[i].vendeur,
            characteristics: data.products[i].characteristics
          };
          productOfStore.push(product);
        }
        const store: Store = {
          id: data._id,
          img: data.img[0].formats.small.url,
          name: data.name,
          products: productOfStore,
          subCategory: arraySubCategory,
          banner_desktop: data.banner_desktop.url,
          banner_mobile: data.banner_mobile.url
        };
        return store;
      })
    );
  }
  extractUrlOfData(data: any[], index: number): string[] {
    const result: string[] = [];
    data[index].img.forEach((el: any) => {
      result.push(el.url);
    });
    return result;
  }
}
