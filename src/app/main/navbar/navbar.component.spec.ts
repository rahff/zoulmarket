import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Directive, HostListener, Input, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { CategoryService } from 'src/app/services/category.service';
import { PlatformDetector } from 'src/app/services/platform-detection.service';

import { fakeArrayCategory } from 'test-utils/categoryService.fake-data';
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
  let platForm: any;
  beforeEach(waitForAsync(() => {
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
      ]
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
    mockPlatformService.getPlatform.and.returnValue(of({mobile: true, os: 'Android', email: 'test123@gmail.com' }))
    fixture.detectChanges()
    const el = fixture.debugElement.query(By.css(".navbar-mobile"))
    expect(el).toBeTruthy()
    const buttonMenu = el.query(By.css('.btn-menu'))
    buttonMenu.triggerEventHandler('click', null);
    expect(component.stateUlMobile).toBe('open')
  })
  it('should be on default version if is on pc and show category option when the button is clicked ', ()=>{
    mockPlatformService.getPlatform.and.returnValue(of({mobile: false, os: 'Linux', email: 'test123@gmail.com' }))
    component.toggleOption = true;
    fixture.detectChanges();
    const showListCategorySpy = spyOn(component, "showListCategory")
    const defaultNavbar = fixture.debugElement.query(By.css(".navbar-nav"))
    expect(defaultNavbar).toBeTruthy()
    const button = defaultNavbar.query(By.css('#select'));
    button.triggerEventHandler('click',{stopPropagation: ()=>{}})
    expect(showListCategorySpy).toHaveBeenCalled()
  })
  it('should navigate when links are clicked', ()=>{
    mockPlatformService.getPlatform.and.returnValue(of({mobile: false, os: 'Linux', email: 'test123@gmail.com' }))
    fixture.detectChanges()
    const links = fixture.debugElement.queryAll(By.directive(RouterLinkDirective))
    const arraylinkParams = ['/',["/boutique","products","6109cd0ea744555c43396ffc"],["/boutique","products","6113928e60c19c15cad28cd5"],['connexion'], "/panier"]
    for (let i = 0; i < links.length; i++) {
      const routerLink = links[i].injector.get(RouterLinkDirective);
      links[i].triggerEventHandler('click', null)
      expect(routerLink.navigateTo).toEqual(arraylinkParams[i])
    } 
  })
});
