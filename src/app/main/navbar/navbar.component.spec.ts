import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import {  BehaviorSubject, Observable, of } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { CategoryService } from 'src/app/services/category.service';
import { PlatformDetector } from 'src/app/services/platform-detection.service';

import { fakeArrayCategory } from 'test-utils/categoryService.fake-data';
import { fakeUser } from 'test-utils/kakeUser-data';

import { NavbarComponent } from './navbar.component';



// class MockCartService {
//   constructor(){}
//   cartLength$(): Observable<number>{
//     return of(1).pipe()
//   }
// }

// class MockUserservice {
//   constructor(){}
//   user$(): Observable<User | null>{
//     return of(fakeUser)
//   }
// }
class MockRouter{
  constructor(){}
  navigate(){
    return;
  }
}

fdescribe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let mockCategoryService: any;
  let mockCartService: any;
  let mockUserService: any;
  let mockAuthService: any;
  let mockRouter: any;
  let mockPlatformService: any
  let platForm: any;
  beforeEach(waitForAsync(() => {
    mockCategoryService = jasmine.createSpyObj("CategoryService", ['getCategories'])
    mockAuthService = jasmine.createSpyObj("AuthService", ['logOut'])
    mockPlatformService = jasmine.createSpyObj(['getOS'],{"UserPlatform": new BehaviorSubject({})})
    mockUserService = jasmine.createSpyObj('UserService', ['user$'])
    mockCartService = jasmine.createSpyObj('CartService', ["getCartLength"])
    mockCartService.getCartLength.and.returnValue(of(1))
    mockRouter = new MockRouter()
    mockCategoryService.getCategories.and.returnValue(of(fakeArrayCategory));
    TestBed.configureTestingModule({
      declarations: [ NavbarComponent ],
      imports: [HttpClientTestingModule, NoopAnimationsModule],
      providers: [
        {provide: CategoryService, useValue: mockCategoryService},
        {provide: CartService, useValue: mockCartService},
        {provide: AuthService, useValue: mockAuthService},
        {provide: Router, useValue: mockRouter},
        {provide: PlatformDetector, useValue: mockPlatformService},
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents()
    TestBed.inject(CategoryService)
    TestBed.inject(CartService)
    TestBed.inject(AuthService)
    TestBed.inject(PlatformDetector)
    TestBed.inject(Router)
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
  }));
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should be on mobile version if is on mobile and show menu when button is clicked', ()=>{
    mockPlatformService.UserPlatform.next({mobile: true, os: 'Android', email: 'test123@gmail.com' })
    fixture.detectChanges()
    const el = fixture.debugElement.query(By.css(".navbar-mobile"))
    expect(el).toBeTruthy()
    const buttonMenu = el.query(By.css('.btn-menu'))
    buttonMenu.triggerEventHandler('click', null);
    expect(component.stateUlMobile).toBe('open')
  })
  it('should be on default version if is on pc and show category option when the button is clicked ', ()=>{
    mockPlatformService.UserPlatform.next({mobile: false, os: 'Linux', email: 'test123@gmail.com' });
    component.toggleOption = true;
    fixture.detectChanges();
    const showListCategorySpy = spyOn(component, "showListCategory")
    const defaultNavbar = fixture.debugElement.query(By.css(".navbar-nav"))
    expect(defaultNavbar).toBeTruthy()
    const button = defaultNavbar.query(By.css('#select'));
    button.triggerEventHandler('click',{stopPropagation: ()=>{}})
    expect(showListCategorySpy).toHaveBeenCalled()
  })
 
});
