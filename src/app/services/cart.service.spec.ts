import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CartService } from './cart.service';
import { fakeCart, fakeItem } from '../../../test-utils/cartSevice.fake-data';

describe('CartService', () => {
  let service: CartService,
      httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        CartService
      ]
    });
    service = TestBed.inject(CartService);
    httpTestingController = TestBed.inject(HttpTestingController);
    service.cart$.next(fakeCart)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should update qtyValue on cart', ()=>{
    service.updateQuantity(2,0)
    expect(service.cart$.value[0].quantity).toBe(2)
  });
  it('should add item to cart', ()=>{
    service.addItemToCart(fakeItem);
    expect(service.cart$.value.length).toBe(2)
    expect(service.cart$.value[1].quantity).toBe(fakeItem.quantity)
    expect(service.cart$.value[1].cost).toBe(fakeItem.cost)
    expect(service.cart$.value[1].product).toBe(fakeItem.product)
    expect(service.cart$.value[0]).toBe(fakeCart[0])
  });
  it('should delete item by id', ()=>{
    service.deleteItem(0)
    expect(service.cart$.value.length).toBeFalsy()
  })
});
