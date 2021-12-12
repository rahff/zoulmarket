import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { of } from 'rxjs';
import { HomeRoutingModule } from './home-routing.module';

import { HomeComponent } from './home.component';
class MockActivatedRoute {
  queryParamMap(){
    return of('ok')
  }
  constructor(){}
}
fdescribe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let activatedRouteSpy: any;
  let routerSpy: any;
  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj("Router", ['navigate'])
    await TestBed.configureTestingModule({
      imports: [HomeRoutingModule],
      declarations: [ HomeComponent ],
      providers: [
        {
          provide: ActivatedRoute, useValue: {
            snapshot: {
            queryParamMap:
            {
              get: ()=> "someValue as string"
            },
            data:{}
          }
          }, 
        },
        {
          provide: Router, useValue: routerSpy 
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
