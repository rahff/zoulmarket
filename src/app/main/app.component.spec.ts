import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of, Subject } from 'rxjs';
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
class MockMenuAsideService {
  constructor(){}
  toggleAside(): Observable<Event>{
    return of(mockEvent)
  }
}

fdescribe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>  ;
  let app: AppComponent;
  let mockCategoryService: any;
  let mockPlatformDetector: any;
  let mockMenuAsideService: MockMenuAsideService
  let DOM:DebugElement;
  beforeEach(async () => {
    mockCategoryService = jasmine.createSpyObj('CategoryService', ["getCategories"])
    mockPlatformDetector = jasmine.createSpyObj('PlatformDetector', ["getOS"], ["UserPlatform"])
    mockMenuAsideService = new MockMenuAsideService()
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        LoadingModule,
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
      // mockPlatformDetector.UserPlatform.and.returnValue(of({ mobile: true, os: "Android", email: "@emal.com" }))
      TestBed.inject(CategoryService)
      TestBed.inject(PlatformDetector)
      TestBed.inject(MenuAsideService)
      fixture = TestBed.createComponent(AppComponent);
      app = fixture.componentInstance
      DOM = fixture.debugElement
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it(`should have as title 'zoulMarket'`, () => {
    expect(app.title).toEqual('zoulMarket');
  });
  it('should have navbar display', ()=>{
    const navbar = DOM.query(By.directive(NavbarComponent))
    expect(navbar).toBeTruthy()
  });
  it('should change stateMenu property when toggleMenu is called', ()=>{
   fixture.componentInstance.toggleMenu(mockEvent)
   expect(fixture.componentInstance.stateMenu).toBe('open')
   fixture.componentInstance.toggleMenu(mockEvent)
   expect(fixture.componentInstance.stateMenu).toBe('close')
  })
  it('should have a aside element', ()=>{
    const aside = fixture.debugElement.query(By.css('aside'))
    expect(aside).toBeTruthy()
  })
  
})