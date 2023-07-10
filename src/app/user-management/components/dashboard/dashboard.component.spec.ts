import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { UsersService } from '../../service/users.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import { HttpApiService } from 'src/app/shared/http/http-api.service';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      imports:[MatDialogModule,MatInputModule,MatButtonModule,MatInputModule,MatIconModule,MatSortModule,MatTableModule,HttpClientModule,RouterTestingModule,BrowserAnimationsModule],
      providers:[UsersService,MatDialog,HttpApiService]
    });
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
