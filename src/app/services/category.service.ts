import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Category } from '../shared/models/category.model';
import { Product } from '../shared/models/product';
import { SubCategory } from '../shared/models/sub-category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private URL_API = environment.URL_API;
  constructor(private http: HttpClient) {}

  getCategories(): Observable<Category[]> {
    return this.http.get(this.URL_API + 'categories').pipe(
      map((data: any) => {
        let arrayCategory = [];
        for (let i = 0; i < data.length; i++) {
          const category: Category = {
            name: data[i].name,
            id: data[i]._id,
            icon: data[i].icon[0],
            promo: data[i].promo,
          };
          arrayCategory.push(category);
        }
        return arrayCategory;
      })
    );
  }
  getSuggestionCategory(): Observable<Category[]> {
    return this.http.get<Category[]>(this.URL_API + 'suggestions').pipe(
      map((data: any) => {
        return data.suggestion;
      }),
      map((data: any) => {
        const arraySuggestion: Category[] = [];
        for (let i = 0; i < data.length; i++) {
          const suggestion: Category = {
            icon: data[i].icon.formats.thumbnail.url,
            id: data[i]._id,
            name: data[i].name,
            promo: data[i].promo,
          };
          arraySuggestion.push(suggestion);
        }
        return arraySuggestion;
      })
    );
  }
  getSubCategoryOfCategory(id: string | null): Observable<SubCategory[]> {
    return this.http.get(this.URL_API + 'categories/' + id).pipe(
      map((data: any) => {
        let arrayIds = [];
        for (let i = 0; i < data.sous_categories.length; i++) {
          const id = data.sous_categories[i]._id;
          arrayIds.push(id);
        }
        return arrayIds;
      }),
      map((data: any) => {
        return this.getSubCategoriesByIds(data);
      })
    );
  }
  getSubCategoriesByIds(data: any): SubCategory[] {
    const arraySubCategory: SubCategory[] = [];
    data.forEach(async (id: string) => {
      const oneSubCategory = await this.http
        .get(this.URL_API + 'sous-categories/' + id)
        .pipe(first())
        .subscribe((data: any) => {
          const subCategory: SubCategory = {
            id: data._id,
            img: data.img.url,
            name: data.name,
            products: data.products,
          };
          arraySubCategory.push(subCategory);
        });
    });
    return arraySubCategory;
  }

  getProductOfSubCategory(id: string | null): Observable<Product[]> {
    return this.http.get(this.URL_API + 'sous-categories/' + id).pipe(
      map((data: any) => {
        return data.products;
      }),
      map((data: any) => {
        const arrayProduct: Product[] = [];
        for (let i = 0; i < data.length; i++) {
          const imgs = this.extractUrlOfData(data, i);
          const product: Product = {
            description: data[i].description,
            id: data[i]._id,
            img: imgs,
            name: data[i].name,
            price: data[i].price,
            vendeur: data[i].vendeur,
            FNSKU: data[i].FNSKU,
            avis: data[i].avis,
          };
          arrayProduct.push(product);
        }
        return arrayProduct;
      })
    );
  }
  getPromoOfCategory(id: string | null | undefined): Observable<Product[]> {
    return this.http.get(this.URL_API + 'categories/' + id).pipe(
      map((data: any) => {
        return data.promo;
      }),
      map((path: any) => {
        return this.getPromoProductIngetPromoOfCategory(path);
      })
    );
  }
  getCategoryById(id: string): Observable<any> {
    return this.http.get(this.URL_API + 'categories/' + id).pipe(
      map((data: any) => {
        return data.sous_categories;
      }),
      map((data: any) => {
        const arraySubCategory: SubCategory[] = []
        for (let i = 0; i < data.length; i++) {
          const subCategory: any = {
            ...data[i],
            img: data[i].img.formats.thubnail ? data[i].img.formats.thubnail.url : data[i].img.formats.small.url
          };
          delete subCategory.__v;
          delete subCategory._id;
          delete subCategory.pulblished_at;
          delete subCategory.updatedAt;
          delete subCategory.createdAt;
          arraySubCategory.push(subCategory)
        }
        return arraySubCategory;
      })
    );
  }
  getPromoProductIngetPromoOfCategory(path: string): Product[] {
    const arrayProduct: Product[] = [];
    this.http.get(this.URL_API + path).subscribe((data: any) => {
      data.products.forEach((dataProduct: any, i: number) => {
        const imgs = this.extractUrlOfData(data.products, i);
        const product: Product = {
          id: dataProduct._id,
          img: imgs,
          price: dataProduct.price,
          name: dataProduct.name,
          vendeur: dataProduct.vendeur,
          description: '',
          FNSKU: dataProduct.FNSKU,
          avis: dataProduct.avis,
        };
        arrayProduct.push(product);
      });
    });

    return arrayProduct;
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
}
