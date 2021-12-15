import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { product, product2 } from "test-utils/product";
import { CartService } from "./cart.service";

fdescribe('CartServive', ()=>{
    let service: CartService,
    httpTesingController: HttpTestingController
    beforeEach(()=>{
        TestBed.configureTestingModule({
            imports: [
              HttpClientTestingModule
            ],
            providers: [
              CartService
            ]
          });
          service = TestBed.inject(CartService);
          httpTesingController = TestBed.inject(HttpTestingController)
          service.cart$.next([{product: product,cost: product.price, quantity:1,size: null}])
    })
    it('should be created', () => {
        expect(service).toBeTruthy();
      });
    it('should add item on cart$', ()=>{
          service.addItemToCart({product: product2,cost: product2.price, quantity:1,size: "38"});
          expect(service.cart$.value).toEqual([{product: product,cost: product.price, quantity:1,size: null},{product: product2,cost: product2.price, quantity:1,size: "38"}])
      })
    it('should increment quantity and cost if same product added', ()=>{
      service.addItemToCart({product: product,cost: product.price, quantity:1,size: null})
      service.addItemToCart({product: product,cost: product.price, quantity:1,size: null})
      expect(service.cart$.value[0]).toEqual({product: product,cost: product.price * 3 , quantity:3,size: null})
    })
})