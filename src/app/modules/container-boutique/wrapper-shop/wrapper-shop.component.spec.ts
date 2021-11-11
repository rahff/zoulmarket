import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WrapperShopComponent } from './wrapper-shop.component';

describe('WrapperShopComponent', () => {
  let component: WrapperShopComponent;
  let fixture: ComponentFixture<WrapperShopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WrapperShopComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WrapperShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
