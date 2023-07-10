import { TestBed } from '@angular/core/testing';

import { LoginService } from './login.service';
import { HttpApiService } from 'src/app/shared/http/http-api.service';
import { HttpClientModule } from '@angular/common/http';

describe('LoginService', () => {
  let service: LoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({providers:[HttpApiService],imports:[HttpClientModule
    ]});
    service = TestBed.inject(LoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
