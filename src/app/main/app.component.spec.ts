import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LoadingModule } from '../shared/loading/loading.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>  ;
  let app: AppComponent;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        LoadingModule,
      ],
      declarations: [
        AppComponent,
        NavbarComponent,
        FooterComponent
      ],
    }).compileComponents().then(()=>{
      fixture = TestBed.createComponent(AppComponent);
      app = fixture.componentInstance
    });
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it(`should have as title 'zoulMarket'`, () => {
    expect(app.title).toEqual('zoulMarket');
  });
  it('should have navbar display', ()=>{
    const el = fixture.nativeElement
    expect(el).toBeTruthy()
  })

});
