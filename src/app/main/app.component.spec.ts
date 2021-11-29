import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { fakeArrayCategory } from 'test-utils/categoryService.fake-data';
import { CategoryService } from '../services/category.service';
import { PlatformDetector } from '../services/platform-detection.service';
import { LoadingModule } from '../shared/loading/loading.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { MenuAsideService } from './home/menu-aside.service';
import { NavbarComponent } from './navbar/navbar.component';

const mockEvent: Event = {
  stopPropagation: ()=>{},
  AT_TARGET: 0,
  BUBBLING_PHASE: 0,
  CAPTURING_PHASE: 0,
  NONE: 0,
  bubbles: true,
  cancelBubble: true,
  cancelable: false,
  composed: true,
  composedPath: ()=>{return []},
  currentTarget: null,
  defaultPrevented: false,
  eventPhase: 0,
  isTrusted: true,
  preventDefault: ()=>{},
  stopImmediatePropagation: ()=>{},
  target: null,
  timeStamp: 1,
  type: "click",
  srcElement: null,
  initEvent: ()=>{},
  returnValue: true
}

fdescribe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>  ;
  let app: AppComponent;
  let mockCategoryService: any;
  let mockPlatformDetector: any;
  let mockMenuAsideService: any;
  let DOM:DebugElement;
  beforeEach( waitForAsync(() => {
    mockCategoryService = jasmine.createSpyObj('CategoryService', ["getCategories"])
    mockPlatformDetector = jasmine.createSpyObj('PlatformDetector', ["getOS", "getPlatform"])
    mockMenuAsideService = jasmine.createSpyObj('MenuAsideService',["observeMenuState"])
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        LoadingModule,
        NoopAnimationsModule
      ],
      declarations: [
        AppComponent,
        NavbarComponent,
        FooterComponent
      ],
      providers: [
        {provide: CategoryService, useValue: mockCategoryService },
        {provide: PlatformDetector, useValue: mockPlatformDetector },
        {provide: MenuAsideService, useValue: mockMenuAsideService },
        
      ],
       schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents()
      mockCategoryService.getCategories.and.returnValue(of(fakeArrayCategory))
      mockMenuAsideService.observeMenuState.and.returnValue((of(null)))
      TestBed.inject(CategoryService)
      TestBed.inject(PlatformDetector)
      TestBed.inject(MenuAsideService)
      fixture = TestBed.createComponent(AppComponent);
      app = fixture.componentInstance
      DOM = fixture.debugElement
  }));

  it('should create the app', () => {
    mockPlatformDetector.getPlatform.and.returnValue(of({ mobile: false, os: "Linux", email: "@emal.com" }))
    fixture.detectChanges()
    expect(app).toBeTruthy();
  });

  it(`should have as title 'zoulMarket'`, () => {
    mockPlatformDetector.getPlatform.and.returnValue(of({ mobile: false, os: "Linux", email: "@emal.com" }))
    fixture.detectChanges()
    expect(app.title).toEqual('zoulMarket');
  });
  it('should have navbar display', ()=>{
    mockPlatformDetector.getPlatform.and.returnValue(of({ mobile: false, os: "Linux", email: "@emal.com" }))
    fixture.detectChanges()
    const navbar = DOM.query(By.directive(NavbarComponent))
    expect(navbar).toBeTruthy()
  });
  it('should change stateMenu property when toggleMenu is called', ()=>{
    mockPlatformDetector.getPlatform.and.returnValue(of({ mobile: false, os: "Linux", email: "@emal.com" }))
    fixture.detectChanges()
   fixture.componentInstance.toggleMenu(mockEvent)
   expect(fixture.componentInstance.stateMenu).toBe('open')
   fixture.componentInstance.toggleMenu(mockEvent)
   expect(fixture.componentInstance.stateMenu).toBe('close')
  })
  it('should have a aside element', ()=>{
    mockPlatformDetector.getPlatform.and.returnValue(of({ mobile: false, os: "Linux", email: "@emal.com" }))
    fixture.detectChanges()
    const aside = fixture.debugElement.query(By.css('aside'))
    expect(aside).toBeTruthy()
  })
  it("should be initialize as mobile version", ()=>{
    mockPlatformDetector.getPlatform.and.returnValue(of({ mobile: true, os: "Android", email: "@emal.com" }))
    fixture.detectChanges()
    expect(fixture.componentInstance.mobile).toBeTrue()
  })
  it('should be on mobile version when is on mobile', ()=>{
    mockPlatformDetector.getPlatform.and.returnValue(of({ mobile: true, os: "Android", email: "@emal.com" }))
    fixture.detectChanges();
    const asideHeaderTitle = fixture.debugElement.query(By.css('aside header')).nativeElement.textContent
    expect(asideHeaderTitle).toContain('Catégories de produits')
  })
})