import { fakeAsync, TestBed } from '@angular/core/testing';
import {  HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing"
import { AuthService } from './auth.service';
import { fakeBody, fakeAuth, fakeResponseError, URL_API_LOGIN, URL_API_REGISTER, bodyFake, URL_API_USER, userInfos  } from '../../../test-utils/fake-data'


fdescribe('AuthService', () => {
  
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
    })
    const req = httpTestingController.expectOne(URL_API_REGISTER);
    expect(req.request.method).toBe("POST");
    req.flush(fakeAuth)
  }));
  it("should post login user", fakeAsync(()=>{
    service.postLoginUser(bodyFake).then((res)=>{
      expect(res).toBeTrue()
    });
    const req = httpTestingController.expectOne(URL_API_LOGIN);
    expect(req.request.method).toBe('POST');
    req.flush(fakeAuth)
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
  }));
  it('should get token from cookie', ()=>{
    service.getTokenAndIdUserFromCookies();
    expect(service.jwtToken).toBe(fakeAuth.jwt)
  });
  it('should get user infos', fakeAsync(()=>{
    const id = userInfos.id
    service.getUserInfo(id).subscribe();
    const req = httpTestingController.expectOne(URL_API_USER);
    req.flush(userInfos)
    expect(service.user$.value).toEqual(userInfos)
  }));
  it("should reassign token in cookie", ()=>{
    const newToken = "11111111111111111111111"
    service.getTokenFromParam(newToken);
    expect(service.jwtToken).toBe(newToken)
  })
  
});
