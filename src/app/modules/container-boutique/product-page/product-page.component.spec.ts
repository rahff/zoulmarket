import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Data, Params, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { LoadingModule } from 'src/app/shared/loading/loading.module';
import { Variation } from 'src/app/shared/models/variation.model';
import { SharedModule } from 'src/app/shared/shared.module';
import { product } from 'test-utils/product';
import { BOUTIQUE_ROUTES } from '../boutique.routes';
import { ContainerBoutiqueModule } from '../container-boutique.module';
import { ProductResolver } from '../resolver/product.resolver';
import { ProductPageComponent } from './product-page.component';
import { VariationService } from './utils';
import { SubNavComponent } from 'src/app/shared/components/sub-nav/sub-nav.component';
import { LoadingComponent } from 'src/app/shared/loading/loading/loading.component';



describe('ProductPageComponent', () => {
  let component: ProductPageComponent;
  let fixture: ComponentFixture<ProductPageComponent>;
  let activatedRoute: ActivatedRoute;
  let router: Router;
  let cartService: any;
  let variationService: any;
  let httpTesingController: HttpTestingController
  beforeEach(async () => {
    const cartServiceSpy = jasmine.createSpyObj("CartService", [ "addItemToCart" ])
    const routerSpy = jasmine.createSpyObj('Router', ["navigate"])
    const subjectMock = new BehaviorSubject<{
      variation: Variation;
      index: number;
    } | null>(null);
    const subjectSizeMock = new BehaviorSubject<any>(null);
    const mockVariationService = {      
      variation$: subjectMock.asObservable(),
      size$: subjectSizeMock.asObservable()
};
    await TestBed.configureTestingModule({
      declarations: [SubNavComponent, LoadingComponent],
      imports: [ ContainerBoutiqueModule, SharedModule, RouterTestingModule.withRoutes(BOUTIQUE_ROUTES), HttpClientTestingModule, LoadingModule ],
      providers: [ 
       { provide: CartService, useValue: cartServiceSpy},
       { provide: Router, useValue: routerSpy},
       { provide: ActivatedRoute, useValue: {
         snapshot: {
            params: {
                subscribe: (fn: (value: Params) => void) => fn({
                    id: '123',
                }),
            },
            url: [
              {
                  path: '/:id',
              }
          ],
          data: {
            subscribe: (fn: (value: Data) => void) => fn({
                product: product,
            }),
        },
    }
        }
      }, 
       { provide: VariationService, useValue: mockVariationService},
       ProductResolver
      ],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .overrideComponent(SubNavComponent, {
      set: {
          selector: 'app-sub-nav',
          template: `<h6>subNav works!</h6>`
      }
    }).overrideComponent(LoadingComponent, {
      set: {
        selector: 'app-loading',
          template: `<h6>loading works!</h6>`,
      }
    })
  });
  beforeEach(()=>{  
    activatedRoute =  TestBed.inject(ActivatedRoute);
    cartService = TestBed.inject(CartService);
    httpTesingController = TestBed.inject(HttpTestingController)
    router = TestBed.inject(Router);
    variationService = TestBed.inject(VariationService);  
    fixture = TestBed.createComponent(ProductPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  })
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
