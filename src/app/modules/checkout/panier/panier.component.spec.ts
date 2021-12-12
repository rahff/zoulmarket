import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { AlertService } from 'src/app/services/alert.service';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';

import { PanierComponent } from './panier.component';

fdescribe('PanierComponent', () => {
  let component: PanierComponent;
  let fixture: ComponentFixture<PanierComponent>;
  let routerSpy: any;
  let productSeviceSpy: any;
  let userServiceSpy: any;
  let alertServiceSpy: any;
  let orderSrviceSpy: any;
  let cartServiceSpy: any;
  let httpTestingController: HttpTestingController;
  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ["navigate"]);
    productSeviceSpy = jasmine.createSpyObj('ProductService',["PromoSubject"]);
    userServiceSpy = jasmine.createSpyObj('UserService', ['user$']);
    alertServiceSpy = jasmine.createSpyObj('AlertService', ["MakeAlert"]);
    orderSrviceSpy = jasmine.createSpyObj('OrderService', ['startCheckout']);
    cartServiceSpy = jasmine.createSpyObj('CartService', {cart$: new BehaviorSubject([])})
    await TestBed.configureTestingModule({
      declarations: [ PanierComponent ],
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: CartService, useValue: cartServiceSpy
        },
        {
          provide: AlertService, useValue: alertServiceSpy
        },
        {
          provide: Router, useValue: routerSpy
        },
        {
          provide: OrderService, useValue: orderSrviceSpy
        },
        {
          provide: UserService, useValue: userServiceSpy
        },
        {
          provide: CartService, useValue: {
            cart$:{
              subscribe: ()=> of(null)
            }
          }
        },
        {
          provide: ProductService, useValue: {
            PromoSubject: {pipe: ()=> of(null)},
            getProductPromo:()=> of(null)}
        },
      ]
    })
    .compileComponents();
  });
  
  beforeEach(() => {
    fixture = TestBed.createComponent(PanierComponent);
    component = fixture.componentInstance;
    userServiceSpy.user$.and.returnValue(of(null))
    cartServiceSpy.cart$.and.returnValue(of(null))
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
