
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { CoreModule } from '../core/core.module';
import { AuthService } from '../services/auth.service';
import { PlatformDetector } from '../services/platform-detection.service';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';



fdescribe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>  ;
  let app: AppComponent;
  let mockPlatformDetector: any;
  let mockAuthService: any;
  let DOM: DebugElement;
  beforeEach( waitForAsync(() => {
    mockPlatformDetector = jasmine.createSpyObj('PlatformDetector', ["getOS"])
    mockAuthService = jasmine.createSpyObj('AuthService', ["getTokenAndIdUserFromCookies"])
    TestBed.configureTestingModule({
      imports: [
        CoreModule,
        RouterTestingModule
      ],
      declarations: [
        AppComponent,
        NavbarComponent,
        FooterComponent
      ],
      providers: [
        {provide: PlatformDetector, useValue: mockPlatformDetector },
        {provide: AuthService, useValue: mockAuthService },
      ]
    }).compileComponents()
      TestBed.inject(PlatformDetector)
      fixture = TestBed.createComponent(AppComponent);
      app = fixture.componentInstance;
      DOM = fixture.debugElement;
      fixture.detectChanges()
  }));

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it(`should have as title 'zoulMarket'`, () => {
    expect(app.title).toEqual('zoulMarket');
  });
  it('should have navbar display', ()=>{
    fixture.detectChanges()
    const navbar = DOM.query(By.directive(NavbarComponent))
    expect(navbar).toBeTruthy()
  });
  it('should have footer display', ()=>{
    fixture.detectChanges()
    const footer = DOM.query(By.directive(FooterComponent))
    expect(footer).toBeTruthy()
  });
  it('should call getOs platformDetector service method', ()=>{
    app.ngOnInit()
    expect(mockPlatformDetector.getOS).toHaveBeenCalled()
  })
  it('should call getTokenAndIdUserFromCookies AuthService method', ()=>{
    app.ngOnInit()
    expect(mockAuthService.getTokenAndIdUserFromCookies).toHaveBeenCalled()
  })
})