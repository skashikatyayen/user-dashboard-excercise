import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserUpdateComponent } from './user-update.component';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../../service/users.service';
import { HttpApiService } from 'src/app/shared/http/http-api.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';

describe('UserUpdateComponent', () => {
  let component: UserUpdateComponent;
  let fixture: ComponentFixture<UserUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserUpdateComponent],
      imports:[MatInputModule,MatFormFieldModule,MatButtonModule,HttpClientModule,ToastrModule.forRoot()],
      providers:[{provide:ActivatedRoute, useValue: {
        snapshot: {params: {id: '22'}}
      }},UsersService,HttpApiService,ToastrService]
    });
    fixture = TestBed.createComponent(UserUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
