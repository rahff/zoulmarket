import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormUpdateInfosUserComponent } from './form-update-infos-user.component';

describe('FormUpdateInfosUserComponent', () => {
  let component: FormUpdateInfosUserComponent;
  let fixture: ComponentFixture<FormUpdateInfosUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormUpdateInfosUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormUpdateInfosUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
