import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Product } from '../shared/models/product';
import { CarouselData, Store } from '../shared/models/store';
import { SubCategory } from '../shared/models/sub-category.model';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private URL_API = environment.URL_API;
  public carouselData$: BehaviorSubject<Observable<CarouselData[]>> = new BehaviorSubject<Observable<CarouselData[]>>(of([]));
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
            banner_mobile: data[i].banner_mobile.url,
            email: data[i].email
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
            characteristics: data.products[i].characteristics,
            FNSKU: data.FNSKU,
            avis: data.products[i].avis
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
          banner_mobile: data.banner_mobile.url,
          email: data.email
        };
        return store;
      })
    );
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
  getDataCarousel(): Observable<CarouselData[]>{
   return this.http.get<CarouselData[]>(this.URL_API + "carousel-home").pipe(
     map((payload: any)=>{
       const data = payload.home
       let arrayData: CarouselData[] = []
      for (let i = 0; i < data.length; i++) {
        const item: CarouselData = {
          banner: data[i].banner.url,
          title: data[i].title
        }
        arrayData.push(item)
      }
      return arrayData;
     })
   )
  }
}
