import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { CoreModule } from 'src/app/core/core.module';
import { AlertService } from 'src/app/services/alert.service';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRouteSpy } from 'test-utils/activatedRouteSpy';
import { fakeUser } from 'test-utils/kakeUser-data';

import { CheckoutComponent } from './checkout.component';

fdescribe('CheckoutComponent', () => {
  let component: CheckoutComponent;
  let fixture: ComponentFixture<CheckoutComponent>;
  let routerSpy: any;
  let alertServiceSpy: any;
  let orderServiceSpy: any;
  let userServiceSpy: any;
  let cartServiceSpy: any;
  let activatedRouteSpy = new ActivatedRouteSpy()
  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    alertServiceSpy = jasmine.createSpyObj('AlertService', ['MakeAlert']);
    orderServiceSpy = jasmine.createSpyObj('OrderService', ['confirmOrder']);
    userServiceSpy = jasmine.createSpyObj('UserService', ['user$'])
    cartServiceSpy = jasmine.createSpyObj('CartService', ['reinitCart'])

    await TestBed.configureTestingModule({
      declarations: [ CheckoutComponent ],
      imports: [CoreModule, HttpClientTestingModule],
      providers: [
        {
          provide: ActivatedRoute, useValue: activatedRouteSpy
        },
        {
          provide: Router, useValue: routerSpy
        },
        {
          provide: AlertService, useValue: alertServiceSpy
        },
        {
          provide: UserService, useValue: userServiceSpy
        },
        {
          provide: CartService, useValue: cartServiceSpy
        },
        {
          provide: OrderService, useValue: orderServiceSpy
        },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutComponent);
    component = fixture.componentInstance;
    userServiceSpy.user$.and.returnValue(of(fakeUser))
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it("should return an array of string contains orders's ids", ()=>{
    const ids = component.extractId(fakeUser.orders)
    expect(ids).toEqual(["61829654acc90e482e1ec5b5"])
  })
});
