import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Directive, HostListener, Input, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { CategoryService } from 'src/app/services/category.service';
import { PlatformDetector } from 'src/app/services/platform-detection.service';
import { UserService } from 'src/app/services/user.service';

import { fakeArrayCategory } from 'test-utils/categoryService.fake-data';
import { fakeUser } from 'test-utils/kakeUser-data';
import { RouterLinkDirective } from 'test-utils/stub-directive';

import { NavbarComponent } from './navbar.component';



@Directive({
  selector: "[routerLink]"
})

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
  let userServiceSpy: any;
  beforeEach(waitForAsync(() => {
    userServiceSpy = jasmine.createSpyObj('UserService', {user$: new Observable()})
    mockCategoryService = jasmine.createSpyObj("CategoryService", ['getCategories'])
    mockAuthService = jasmine.createSpyObj("AuthService", ['logOut'])
    mockPlatformService = jasmine.createSpyObj(['getOS', 'getPlatform'])
    mockUserService = jasmine.createSpyObj('UserService', ['user$'])
    mockCartService = jasmine.createSpyObj('CartService', ["getCartLength"])
    mockCartService.getCartLength.and.returnValue(of(1))
    mockRouter = new MockRouter()
    mockCategoryService.getCategories.and.returnValue(of(fakeArrayCategory));
    TestBed.configureTestingModule({
      declarations: [ NavbarComponent, RouterLinkDirective ],
      imports: [HttpClientTestingModule, NoopAnimationsModule],
      providers: [
        {provide: CategoryService, useValue: mockCategoryService},
        {provide: CartService, useValue: mockCartService},
        {provide: AuthService, useValue: mockAuthService},
        {provide: Router, useValue: mockRouter},
        {provide: PlatformDetector, useValue: mockPlatformService},
        {provide: UserService, useValue: userServiceSpy},
      ]
    }).compileComponents()
    TestBed.inject(CategoryService)
    TestBed.inject(CartService)
    TestBed.inject(AuthService)
    TestBed.inject(PlatformDetector)
    TestBed.inject(Router)
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    userServiceSpy.user$.and.returnValue(of(fakeUser))
  }));
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate when links are clicked', ()=>{
    const links = fixture.debugElement.queryAll(By.directive(RouterLinkDirective))
    console.log(links);
    
    const arraylinkParams = ['/', '/',["/boutique","products","6109cd0ea744555c43396ffc"],["/boutique","products","6113928e60c19c15cad28cd5"],['connexion'], "/panier"]
    for (let i = 0; i < links.length; i++) {
      const routerLink = links[i].injector.get(RouterLinkDirective);
      links[i].triggerEventHandler('click', null)
      expect(routerLink.navigateTo).toEqual(arraylinkParams[i])
    } 
  })
});
