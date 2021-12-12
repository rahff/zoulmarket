import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, Data, Params, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { product } from 'test-utils/product';
import { ContainerBoutiqueModule } from '../container-boutique.module';
import { ProductPageComponent } from './product-page.component';




fdescribe('ProductPageComponent', () => {
  let component: ProductPageComponent;
  let fixture: ComponentFixture<ProductPageComponent>;
  let routerSpy: any;
  let cartServiceSpy: any;
  let productService: any;
  let alertServiceSpy: any;
  let activatedRoute: any;
  let httpTesingController: HttpTestingController
  beforeEach(async () => {
    cartServiceSpy = jasmine.createSpyObj("CartService", [ "addItemToCart" ])
    alertServiceSpy = jasmine.createSpyObj('AlertService', ['MakeAlert'])
    routerSpy = jasmine.createSpyObj('Router', ["navigate"])
    productService = jasmine.createSpyObj("ProductService", ["getProductById"])
    TestBed.configureTestingModule({
      declarations: [],
      imports: [ContainerBoutiqueModule, SharedModule, HttpClientTestingModule],
      providers: [
        { provide: CartService, useValue: cartServiceSpy },
        { provide: ProductService, useValue: productService },
        { provide: Router, useValue: routerSpy },
        {
          provide: ActivatedRoute, useValue: {
            snapshot: {
              params: {
                subscribe: (fn: (value: Params) => void) => fn({
                  id: '123',
                }),
              },
              url: [
                {
                  path: '/:id',
                }
              ],
            },
            paramMap:{
              subscribe: ()=> of("someId")
            } 
          }
        }
      ],
      schemas: [NO_ERRORS_SCHEMA],
    })
  });
  beforeEach(()=>{  
    activatedRoute =  TestBed.inject(ActivatedRoute);
    cartServiceSpy = TestBed.inject(CartService);
    httpTesingController = TestBed.inject(HttpTestingController)
    routerSpy = TestBed.inject(Router);
    fixture = TestBed.createComponent(ProductPageComponent);
    component = fixture.componentInstance;
    productService.getProductById.and.returnValue(of(product))
    component.product = product;

    fixture.detectChanges();
  })
  it('should create and initialize correctly', () => {
    expect(component).toBeTruthy();
    component.ngOnInit()
    expect(component.product).toEqual({...product})
  
  });
  it('should initialize all image correctly and disply him in template', ()=>{
    component.product = product;
    fixture.detectChanges();
    component.initImg()
    expect(component.currentImg).toContain(component.product.img[0].img_big)
    expect(component.arraySmallImg[1]).toContain(component.product.img[1].img_mini)
    expect(component.arrayBigImg[2]).toContain(component.product.img[2].img_big)
  })
  it('should change the current image when small image is clickled' , ()=>{
    component.product = product;
    fixture.detectChanges();
    const spanImgEls = fixture.debugElement.queryAll(By.css('span.owl-thumb-item'));
    console.log(spanImgEls);
    
    component.initImg()
    for (let i = 0; i < spanImgEls.length; i++) {
      spanImgEls[i].triggerEventHandler('click', i)
      expect(component.currentImg).toContain(component.arrayBigImg[i])
    }
  })
  it('should return a array of string', ()=>{
   const result = component.extractCharacteristics({key1: "value1", key2: "value2", key3: "value3"})
   expect(result).toEqual(["value1", "value2", "value3"])
  })
  it('should set size property an addClass active on current button when is clicked', ()=>{
    const arrayBtnSizes = fixture.debugElement.queryAll(By.css('label[data-test="sizes"]'));
    fixture.detectChanges();
    for (let i = 0; i < arrayBtnSizes.length; i++) {
     arrayBtnSizes[i].triggerEventHandler('click',[i,i])
     expect(arrayBtnSizes[i].classes['active']).toBeTruthy()
     expect(component.currentSize).toBe(i.toString())
    }
  })
  it('should set quatity property an addClass active on current button when is clicked', ()=>{
    const arrayBtnQty = fixture.debugElement.queryAll(By.css('label[data-test="qty"]'));
    for (let i = 0; i < arrayBtnQty.length; i++) {
     arrayBtnQty[i].triggerEventHandler('click',[i,i])
     expect(arrayBtnQty[i].classes['active']).toBeTruthy()
     expect(component.currentQuantity).toBe(i)
    }
  })
  it('should call cartService method width correct parameters', ()=>{
    component.haveToChooseOneSize = true;
    component.currentSize = "36"
    component.addToCart();
    expect(cartServiceSpy.addItemToCart).toHaveBeenCalledWith({cost: component.product.price * component.currentQuantity,
      product: component.product,
      quantity: component.currentQuantity,
      size: component.currentSize})
  })
  it('should set default size automatically', fakeAsync(()=>{
    const setQuantitySpy = spyOn(component, "setQuantity");
    component.ngAfterViewInit();
    tick(200);
    expect(setQuantitySpy).toHaveBeenCalledWith(1,0);
  }))
});
