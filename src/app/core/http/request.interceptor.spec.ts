import { TestBed } from '@angular/core/testing';

import { RequestInterceptor } from './request.interceptor';
import { LoginService } from '../auth/service/login.service';
import { HttpApiService } from 'src/app/shared/http/http-api.service';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';

describe('RequestInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      RequestInterceptor,LoginService,HttpApiService
      ],
      imports:[ToastrModule.forRoot(),HttpClientModule]
  }));

  it('should be created', () => {
    const interceptor: RequestInterceptor = TestBed.inject(RequestInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
