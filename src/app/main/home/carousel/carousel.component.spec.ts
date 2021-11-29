import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { StoreService } from 'src/app/services/store.service';

import { CarouselComponent } from './carousel.component';
const fakeDataCarousel = [
  { title: 'test1', banner: 'url1' },
  { title: 'test2', banner: 'url2' },
  { title: 'test3', banner: 'url3' },
];
const fakeEvent: MouseEvent = new MouseEvent('click')
fdescribe('CarouselComponent', () => {
  let component: CarouselComponent;
  let fixture: ComponentFixture<CarouselComponent>;
  let mockStoreSevice: any;
  beforeEach(async () => {
    mockStoreSevice = jasmine.createSpyObj('StoreSevice', ['getDataCarousel']);
    mockStoreSevice.getDataCarousel.and.returnValue(of(fakeDataCarousel));
    await TestBed.configureTestingModule({
      declarations: [CarouselComponent],
      providers: [{ provide: StoreService, useValue: mockStoreSevice }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should be initialize with getDataCarousel value', fakeAsync(()=>{
    component.data$.subscribe((value)=>{  
      expect(value).toEqual(fakeDataCarousel)
    })
    flush()
    expect(component.data).toEqual(fakeDataCarousel)
    expect(component.nbrOfItemInCarousel).toBe(3)
  }))
  it('should choose first item for carousel data', fakeAsync(()=>{
    component.carousel$.subscribe((value)=>{
      expect(value).toEqual(fakeDataCarousel[0])
    })
    flush()
  }))
  it('should call changeData automatically every 5 second', fakeAsync(()=>{  
    const changeDataCarouselSpy = spyOn(component, "changeDataCarousel")
    component.initCarousel()
    tick(5500)
    expect(changeDataCarouselSpy).toHaveBeenCalledWith(1)
    tick(10500)
    expect(changeDataCarouselSpy).toHaveBeenCalledWith(2)
    tick(15200)
    expect(changeDataCarouselSpy).toHaveBeenCalledWith(0)
    component.timer.unsubscribe()
  }))
  it('should change item of carousel when both arrow are clicked', ()=>{
    const arrowLeft = fixture.debugElement.query(By.css(".arrow-left"))
    const arrowRight = fixture.debugElement.query(By.css(".arrow-right"))
    const changeItemCarouselSpy = spyOn(component, "changeItemCarousel")
    arrowLeft.triggerEventHandler('click', fakeEvent)
    expect(changeItemCarouselSpy).toHaveBeenCalled()
    arrowRight.triggerEventHandler('click', fakeEvent)
    expect(changeItemCarouselSpy).toHaveBeenCalledTimes(2)
  })
  it('should change the currentIndex property ++ for right and -- for left', ()=>{
    component.changeItemCarousel(fakeEvent, {t: false})
    expect(component.currentIndex).toBe(0);
    component.changeItemCarousel(fakeEvent, {t: true})
    component.changeItemCarousel(fakeEvent, {t: true})
    expect(component.currentIndex).toBe(2)
    component.changeItemCarousel(fakeEvent, {t: false})
    expect(component.currentIndex).toBe(1);
  })
});
