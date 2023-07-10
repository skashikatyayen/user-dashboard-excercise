import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteUserComponent } from './delete-user.component';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { UsersService } from '../../service/users.service';
import { HttpApiService } from 'src/app/shared/http/http-api.service';
import { HttpClientModule } from '@angular/common/http';

describe('DeleteUserComponent', () => {
  let component: DeleteUserComponent;
  let fixture: ComponentFixture<DeleteUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[MatDialogModule,ToastrModule.forRoot(),HttpClientModule],
      providers:[ToastrService,UsersService,HttpApiService,{ provide: MAT_DIALOG_DATA, useValue: {} }]
    });
    fixture = TestBed.createComponent(DeleteUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
