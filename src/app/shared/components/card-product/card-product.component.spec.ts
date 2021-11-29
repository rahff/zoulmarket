import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatCard, MatCardTitle } from '@angular/material/card';
import { By } from '@angular/platform-browser';
import { oneFakeCategoryById } from 'test-utils/categoryService.fake-data';
import { fakeStore } from 'test-utils/fake-store';
import { product } from 'test-utils/product';

import { CardProductComponent } from './card-product.component';

fdescribe('CardProductComponent', () => {
  let component: CardProductComponent;
  let fixture: ComponentFixture<CardProductComponent>;

  beforeEach( waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CardProductComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should render data', ()=>{
    component.product = product
    let title;
    fixture.detectChanges()
    title = fixture.debugElement.query(By.css("#data-test1"))
    expect(title.nativeElement.textContent).toContain(product.name)
    component.product = null
    component.suggestion = oneFakeCategoryById
    fixture.detectChanges()
    title = fixture.debugElement.query(By.css("#data-test2"))
    expect(title.nativeElement.textContent).toContain(oneFakeCategoryById.name)
    component.product = null;
    component.suggestion = null;
    component.store = fakeStore
    fixture.detectChanges()
    title = fixture.debugElement.query(By.css("#data-test3"))
    expect(title.nativeElement.textContent).toContain(fakeStore.name)
  })
});
