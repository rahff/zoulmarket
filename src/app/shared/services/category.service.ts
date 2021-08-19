import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Category } from '../models/category.model';
import { Product } from '../models/product';
import { SubCategory } from '../models/sub-category.model';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private URL_API = environment.URL_API
  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category[]>{
    return this.http.get(this.URL_API + "categories").pipe(
      map((data:any)=>{
        let arrayCategory = [];
        for (let i = 0; i < data.length; i++) {
          const category: Category = {
            name: data[i].name,
            id: data[i]._id,
            icon: data[i].icon[0]
          }
          arrayCategory.push(category)
        }
        return arrayCategory
      })
    )
  }
  getSuggestionCategory(): Observable<Category[]>{
    return this.http.get<Category[]>(this.URL_API + "suggestions").pipe(
      map((data:any)=>{
        return data.suggestion
      }),
      map((data: any)=>{
        const arraySuggestion: Category[] = []
        for (let i = 0; i < data.length; i++) {
          const suggestion: Category = {
            icon: data[i].icon[0].formats.thumbnail.url,
            id: data[i]._id,
            name: data[i].name
          }
          arraySuggestion.push(suggestion)
        }
        return arraySuggestion
      })
    )
  }
  getDataOfCategory(id: string | null): Observable<{products: Product[], subCategory: SubCategory[]}>{
    return this.http.get<Product[]>(this.URL_API + "categories/"+ id).pipe(
      map((data: any)=>{  
        console.log(data);
        return {products : data.products, subCategory: data.sous_categories}
      }),
      map((data: any)=>{
        const length = data.products.length > 10 ? 10 : data.products.length
        const arrayProduct: Product[] = [];
        for (let i = 0; i < length; i++) {
          const imgs: string[] = this.extractUrlOfData(data.products, i);
          const product: Product = {
            name: data.products[i].name,
            price: data.products[i].price,
            description: data.products[i].description,
            id: data.products[i]._id,
            img: imgs,
            vendeur: data.products[i].vendeur,
            store: data.products[i].store,
            characteristics: data.products[i].characteristics
          }
          arrayProduct.push(product)
        }
        const arraySubCategory: SubCategory[] = [];
        for (let i = 0; i < data.subCategory.length; i++) {
          const subCategory: SubCategory = {
            name: data.subCategory[i].name,
            category: data.subCategory[i].category,
            img: data.subCategory[i].img.formats.thumbnail.url ,
            id: data.subCategory[i]._id
          }
          arraySubCategory.push(subCategory)
        }
        return {products: arrayProduct, subCategory: arraySubCategory}
      })
    )
  }
  getProductOfSubCategory(id: string | null): Observable<Product[]>{
    return this.http.get(this.URL_API + "sous-categories/" + id).pipe(
      map((data: any)=>{
        return data.products
      }),
      map((data: any)=>{
  
        const arrayProduct: Product[] = [];
        for (let i = 0; i < data.length; i++) {
          const imgs: string[] = this.extractUrlOfData(data, i);
          const product: Product = {
            name: data[i].name,
            price: data[i].price,
            description: data[i].description,
            id: data[i]._id,
            img: imgs,
            vendeur: data[i].vendeur,
            store: data[i].store,
            characteristics: data[i].characteristics
          }
          arrayProduct.push(product)
        }
        console.log(arrayProduct);
        
        return arrayProduct
      })
    )
  }
  
  extractUrlOfData(data: any[], index: number): string[]{
    const result: string[] = []
    data[index].img.forEach((el: any) => {
      result.push(el.url)
    });
    return result;
  }
}
