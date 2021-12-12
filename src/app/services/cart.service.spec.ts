import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { product } from "test-utils/product";
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
    })
    it('should be created', () => {
        expect(service).toBeTruthy();
      });
    it('should add item on cart$', ()=>{
          service.addItemToCart({product: product,cost: product.price, quantity:1,size: null});
          expect(service.cart$.value).toEqual([{product: product,cost: product.price, quantity:1,size: null}])
      })
    it('should increment quantity and cost if same product added', ()=>{
      service.addItemToCart({product: product,cost: product.price, quantity:1,size: null})
      service.addItemToCart({product: product,cost: product.price, quantity:1,size: null})
      expect(service.cart$.value[0]).toEqual({product: product,cost: product.price *2 , quantity:2,size: null})
    })
})