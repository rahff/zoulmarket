import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CircleContainerComponent } from './circle-container.component';

describe('CircleContainerComponent', () => {
  let component: CircleContainerComponent;
  let fixture: ComponentFixture<CircleContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CircleContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CircleContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
