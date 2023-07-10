import { TestBed } from '@angular/core/testing';

import { UserPermissionService } from './user-permission.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpApiService } from 'src/app/shared/http/http-api.service';
import { LoginService } from 'src/app/core/auth/service/login.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { RouterTestingModule } from '@angular/router/testing';

describe('UserPermissionService', () => {
  let service: UserPermissionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientModule,ToastrModule.forRoot(),RouterTestingModule],
      providers:[HttpApiService,LoginService,ToastrService]
    });
    service = TestBed.inject(UserPermissionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
