import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewUserComponent } from './view-user.component';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { UsersService } from '../../service/users.service';
import { HttpApiService } from 'src/app/shared/http/http-api.service';
import { HttpClientModule } from '@angular/common/http';

describe('ViewUserComponent', () => {
  let component: ViewUserComponent;
  let fixture: ComponentFixture<ViewUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[MatCardModule,HttpClientModule],
      declarations: [ViewUserComponent],
      providers:[{provide:ActivatedRoute, useValue: {
        snapshot: {params: {id: '22'}}
      }},UsersService,HttpApiService]
    });
    fixture = TestBed.createComponent(ViewUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
