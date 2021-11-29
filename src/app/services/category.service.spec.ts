import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { fakeAsync, flush, TestBed } from '@angular/core/testing';
import { map } from 'rxjs/operators';
import { fakeArrayCategory, URL_API, fakeSuggestionCategory, oneFakeCategoryById, subCategory, ArrayProducts } from 'test-utils/categoryService.fake-data';

import { CategoryService } from './category.service';

describe('CategoryService', () => {
  let service: CategoryService,
      httpTesingController: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        CategoryService
      ]
    });
    service = TestBed.inject(CategoryService);
    httpTesingController = TestBed.inject(HttpTestingController)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('getCategories():should get categories', fakeAsync(()=>{
    service.getCategories().subscribe((data)=>{
      expect(data).toBeTruthy();
      expect(data.length).toBe(2);
      expect(data[0].name).toEqual(fakeArrayCategory[0].name)
      expect(data[1].name).toEqual(fakeArrayCategory[1].name)
    })
    const req = httpTesingController.expectOne(URL_API+ "categories");
    expect(req.request.method).toBe("GET");
    req.flush(fakeArrayCategory)
  }))
  it('getSuggestionCategory():should get array of category', fakeAsync(()=>{
    service.getSuggestionCategory().subscribe((data)=>{
      expect(data).toBeTruthy();
      expect(data.length).toBe(4);
      expect(data[0].name).toEqual(fakeSuggestionCategory.suggestion[0].name);
      expect(data[1].name).toEqual(fakeSuggestionCategory.suggestion[1].name);
    });
    const req = httpTesingController.expectOne(URL_API + 'suggestions');
    expect(req.request.method).toBe("GET");
    req.flush(fakeSuggestionCategory);
    flush()
  }));
  it('getSubCategoryOfCategory():should get an array of subCategory',fakeAsync(()=>{
    const id = oneFakeCategoryById.id
    service.getSubCategoryOfCategory(id).pipe(map((data)=>{
      const returnedData = service.getSubCategoriesByIds(data)
      const req = httpTesingController.expectOne("http://localhost:1337/sous-categories/611b0d4341ea2b39bd0a1844")
      req.flush(subCategory)
      return returnedData
    })).subscribe((data)=>{
      console.log(data);

      expect(data).toBeTruthy()
    });
    const req = httpTesingController.expectOne(URL_API + 'categories/' + id);
    expect(req.request.method).toBe("GET");
    req.flush(oneFakeCategoryById)
    flush()
  }))
  it('getProductOfSubCategory(): should get product of subCategory', fakeAsync(()=>{
    const id = subCategory._id
    service.getProductOfSubCategory(id).subscribe((data)=>{
      expect(data).toBeTruthy()
      expect(data.length).toBe(2);
      expect(data[0].name).toBe('Deevike Basket Femme Chaussure')
      expect(data[1].name).toBe('Basket Femme sport');
    })
    const req = httpTesingController.expectOne(URL_API + 'sous-categories/' + id);
    expect(req.request.method).toBe("GET");
    req.flush(subCategory)
  }));
  it('getPromoOfCategory(): should get an array of product for current category', fakeAsync(()=>{
    const id = oneFakeCategoryById.id
    service.getPromoOfCategory(id).pipe(map((data: any)=>{
      const returnedData = service.getPromoProductIngetPromoOfCategory(data.promo)
      const req = httpTesingController.expectOne(URL_API + oneFakeCategoryById.promo)
      req.flush(ArrayProducts);
      return returnedData;
    })).subscribe((data)=>{
      expect(data).toBeTruthy()      
    })
    const req = httpTesingController.expectOne(URL_API + 'categories/'+ id);
    expect(req.request.method).toBe("GET");
    req.flush(oneFakeCategoryById)
    flush()
  }))
  
});
