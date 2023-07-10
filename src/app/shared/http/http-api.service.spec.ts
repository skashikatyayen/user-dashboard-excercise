import { TestBed } from '@angular/core/testing';

import { HttpApiService } from './http-api.service';
import { LoaderService } from '../loader/loader.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

describe('HttpApiService', () => {
  let service: HttpApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientModule],
      providers:[LoaderService,HttpClient]
    });
    service = TestBed.inject(HttpApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
