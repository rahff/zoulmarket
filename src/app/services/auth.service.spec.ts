import { fakeAsync, flushMicrotasks, TestBed, tick } from '@angular/core/testing';
import {  HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing"
import { AuthService } from './auth.service';
import { fakeBody, fakeAuth, fakeResponseError, URL_API_LOGIN, URL_API_REGISTER, bodyFake, URL_API_USER, userInfos  } from '../../../test-utils/authService.fake-data'


describe('AuthService', () => {
  
  let service: AuthService;
  let httpTestingController: HttpTestingController
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        AuthService
      ]
    });
    service = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should post crendentials', fakeAsync(()=>{
    service.postCredentialsNewUser(fakeBody).then((res)=>{
      expect(res).toBeTrue()
      expect(service.jwtToken).toBe(fakeAuth.jwt)
    })
    const req = httpTestingController.expectOne(URL_API_REGISTER);
    expect(req.request.method).toBe("POST");
    req.flush(fakeAuth)
    flushMicrotasks()
  }));
  it("should post login user", fakeAsync(()=>{
    service.postLoginUser(bodyFake).then((res)=>{
      expect(res).toBeTrue()
      expect(service.jwtToken).toBe(fakeAuth.jwt)
    });
    const req = httpTestingController.expectOne(URL_API_LOGIN);
    expect(req.request.method).toBe('POST');
    req.flush(fakeAuth)
    flushMicrotasks()
  }));
  it("should reject promise on create new user", fakeAsync(()=>{
    service.postCredentialsNewUser(fakeBody).then((res)=>{
      expect(res).toBeFalsy()
    }).catch((message)=>{
      expect(message).toBe("Il y a eu un problème...Veuillez réessayer s\'il vous palît")
    })
    const req = httpTestingController.expectOne(URL_API_REGISTER);
    expect(req.request.method).toBe('POST');
    req.flush(fakeResponseError)
    flushMicrotasks()
  }));
  it('should reject promise on login', fakeAsync(()=>{
    service.postLoginUser(bodyFake).then((res)=>{
      expect(res).toBeFalsy();
    }).catch((message)=>{
      expect(message).toBe('Vos indentifiants sont incorrect')
    });
    const req = httpTestingController.expectOne(URL_API_LOGIN);
    expect(req.request.method).toBe('POST');
    req.flush(fakeResponseError)
    flushMicrotasks()
  }));
  it('should get token from cookie', ()=>{
    service.getTokenAndIdUserFromCookies();
    expect(service.jwtToken).toBe(fakeAuth.jwt)
  });
  it('should get user infos', fakeAsync(()=>{
    const id = userInfos.id
    service.getUserInfo(id).subscribe((res)=>{
      console.log(('erer'));
      expect(res).toEqual(userInfos)
    });
    const req = httpTestingController.expectOne(URL_API_USER);
    req.flush(userInfos)
    expect(service.user$.value).toEqual(userInfos)
  }));
  it("should reassign token in cookie", fakeAsync(()=>{
    const newToken = "1111111111111111111111"
    service.getTokenFromParam(newToken);
    tick(200)
    expect(service.jwtToken).toBe(newToken)
  }))

});
