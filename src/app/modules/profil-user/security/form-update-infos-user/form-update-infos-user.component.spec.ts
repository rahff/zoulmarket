
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProfilUserModule } from '../../profil-user.module';
import { SubjectResolver } from '../../resolvers/subject-update-form.resolver';

import { FormUpdateInfosUserComponent } from './form-update-infos-user.component';

describe('FormUpdateInfosUserComponent', () => {
  let component: FormUpdateInfosUserComponent;
  let fixture: ComponentFixture<FormUpdateInfosUserComponent>;
  let el:any;
  let activatedRoute:ActivatedRoute;
  let form: FormBuilder = new FormBuilder()
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormUpdateInfosUserComponent],
      schemas: [ NO_ERRORS_SCHEMA ],
      imports: [
        ProfilUserModule,
        SharedModule
      ],
      providers: [
        {provide: FormBuilder, useValue: form},
        {provide: SubjectResolver},
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormUpdateInfosUserComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement
    TestBed.inject(ActivatedRoute)
    fixture.detectChanges()
    component.loaded = true;
    component.loading = false;
    component.subject = activatedRoute.snapshot.data['subject'];
    component.typeOfControl = component.initTypeOfControl(component.subject)
    component.initForm()
    fixture.detectChanges()
    component.form = form.group({
      email: ['']
    })
    fixture.detectChanges()
  });

  it('should create', fakeAsync(() => {
  
    expect(component).toBeTruthy();
  }));
});
