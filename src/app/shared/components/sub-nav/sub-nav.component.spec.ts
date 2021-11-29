import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { PlatformDetector } from 'src/app/services/platform-detection.service';
import { UserService } from 'src/app/services/user.service';
import { fakeUser } from '../../../../../test-utils/kakeUser-data';
import { SubNavComponent } from './sub-nav.component';
import { RouterLinkDirective } from 'test-utils/stub-directive';

fdescribe('SubNavComponent', () => {
  let component: SubNavComponent;
  let fixture: ComponentFixture<SubNavComponent>;
  let mockCartService: any;
  let mockMenuAsideService: any;
  let mockUserService: any;
  let mockPlatformDetector: any;
  beforeEach(
    waitForAsync(() => {
      mockCartService = jasmine.createSpyObj('cartService', ['getCartLength']);
      mockMenuAsideService = jasmine.createSpyObj('MenuAsideService', [
        'toggleMenuAside',
      ]);
      mockUserService = jasmine.createSpyObj('UserService', ['user$']);
      mockPlatformDetector = jasmine.createSpyObj('PlatformDetector', [
        'getPlatform',
      ]);
      TestBed.configureTestingModule({
        declarations: [SubNavComponent, RouterLinkDirective],
        imports: [HttpClientTestingModule],
        providers: [
          {
            provide: PlatformDetector,
            useValue: mockPlatformDetector,
          },
          {
            provide: UserService,
            useValue: mockUserService,
          },
          {
            provide: CartService,
            useValue: mockCartService,
          },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    mockCartService.getCartLength.and.returnValue(of(1));
    mockUserService.user$.and.returnValue(of(fakeUser));
    fixture = TestBed.createComponent(SubNavComponent);
    component = fixture.componentInstance;
  });

  it('should create and initialize', () => {
    mockPlatformDetector.getPlatform.and.returnValue(
      of({ mobile: true, os: 'Android', email: 'test123@gmail.com' })
    );
    mockCartService.getCartLength.and.returnValue(of(1));
    fixture.detectChanges();
    expect(component).toBeTruthy();
    expect(component.mobile).toBeTrue();
    expect(component.userId).toBeTruthy();
    expect(component.cartLength).toBe(1);
  });
  it('should call toggleMenu method when button is clicked', () => {
    mockPlatformDetector.getPlatform.and.returnValue(
      of({ mobile: false, os: 'Linux', email: 'test123@gmail.com' })
    );
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('.btn-sub-nav'));
    const toggleMenuSpy = spyOn(component, 'toggleMenu');
    button.triggerEventHandler('click', null);
    expect(toggleMenuSpy).toHaveBeenCalled();
  });
  it('sould be on mobile version if is on mobile device', () => {
    mockPlatformDetector.getPlatform.and.returnValue(
      of({ mobile: true, os: 'Android', email: 'test123@gmail.com' })
    );
    fixture.detectChanges();
    expect(component.mobile).toBeTrue();
    const title = fixture.debugElement.query(By.css('span[data-test]'))
      .nativeElement.textContent;
    expect(title).toBe('CATEGORIES');
  });
  it('sould be on DEFAULT version if is on PC device', () => {
    mockPlatformDetector.getPlatform.and.returnValue(
      of({ mobile: false, os: 'Linux', email: 'test123@gmail.com' })
    );
    fixture.detectChanges();
    expect(component.mobile).toBeFalse();
    const title = fixture.debugElement.query(By.css('span[data-test]'))
      .nativeElement.textContent;
    expect(title).toBe('MENU');
  });
  it('should navigate to correct route for user profil account', () => {
    mockPlatformDetector.getPlatform.and.returnValue(
      of({ mobile: true, os: 'Android', email: 'test123@gmail.com' })
    );
    mockUserService.user$.and.returnValue(of(fakeUser));
    const userId = fakeUser.id;
    fixture.detectChanges();
    const link = fixture.debugElement.query(By.css('.icon-account'));
    const routerLink = link.injector.get(RouterLinkDirective);
    link.triggerEventHandler('click', null);
    expect(routerLink.navigateTo).toEqual(['/profil', `${userId}`]);
  });
  it('should navigate to correct route for connexion link', () => {
    mockPlatformDetector.getPlatform.and.returnValue(
      of({ mobile: true, os: 'Android', email: 'test123@gmail.com' })
    );
    mockUserService.user$.and.returnValue(of(null));
    fixture.detectChanges();
    const link = fixture.debugElement.query(By.css('.icon-account'));
    const routerLink = link.injector.get(RouterLinkDirective);
    link.triggerEventHandler('click', null);
    expect(routerLink.navigateTo).toEqual('/connexion');
  });
});
