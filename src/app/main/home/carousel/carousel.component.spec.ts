import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { PlatformDetector } from 'src/app/services/platform-detection.service';
import { StoreService } from 'src/app/services/store.service';

import { CarouselComponent } from './carousel.component';
const fakeDataCarousel = [
  { title: 'test1', banner: 'url1' },
  { title: 'test2', banner: 'url2' },
  { title: 'test3', banner: 'url3' },
];
fdescribe('CarouselComponent', () => {
  let component: CarouselComponent;
  let fixture: ComponentFixture<CarouselComponent>;
  let mockStoreSevice: any;
  let platformDetectorSpy: any;
  beforeEach(async () => {
    mockStoreSevice = jasmine.createSpyObj('StoreSevice', ['getDataCarousel']);
    platformDetectorSpy = jasmine.createSpyObj('PlatformDetector', ["getPlatform"])
    mockStoreSevice.getDataCarousel.and.returnValue(of(fakeDataCarousel));
    await TestBed.configureTestingModule({
      declarations: [CarouselComponent],
      providers: [{ provide: StoreService, useValue: mockStoreSevice },
        { provide: PlatformDetector, useValue: platformDetectorSpy }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarouselComponent);
    component = fixture.componentInstance;
    platformDetectorSpy.getPlatform.and.returnValue(of({ mobile: false, os: "os", email: "email" }))
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should initialize heigth value correctly', ()=>{
    platformDetectorSpy.getPlatform.and.returnValue(of({ mobile: true, os: "os", email: "email" }))
    component.ngOnInit()
    expect(component.height).toBe(200)
  })
});
