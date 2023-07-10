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
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  const userService = jasmine.createSpyObj('UsersService', ['getUsersList']);

  const matDialog = jasmine.createSpyObj('MatDialog', ['open']);

  const dialogCloseSpy = matDialog.open.and.returnValue({
    afterClosed: () => {
      return of("yes");
    }
  });
  // Make the spy return a synchronous Observable with the test data
  const getUsersListSpy = userService.getUsersList.and.returnValue(of([
    {
      createdAt: 1688828744,
      name: 'Chris Rippin Sr.',
      email: 'Wilmer_Feest76@yahoo.com',
      role: 'ROLE_USER',
      password: 'WaP99l8ubuPLEwA',
      id: '2'
    },
    {
      createdAt: 1688828684,
      name: 'Joann Deckow',
      email: 'Garrett_Senger@hotmail.com',
      role: 'ROLE_USER',
      password: 'FlYJcYLNehbAZfS',
      id: '3'
    },
    {
      createdAt: 1688828624,
      name: 'Nicole Wintheiser Jr.',
      email: 'Hilario39@yahoo.com',
      role: 'ROLE_USER',
      password: 'GhuLHG7urZfriKN',
      id: '4'
    },
    {
      createdAt: 1688828564,
      name: 'Eleanor Rolfson',
      email: 'Prince8@gmail.com',
      role: 'ROLE_USER',
      password: 'H2d1xdxa9FKX9V9',
      id: '5'
    },
    {
      createdAt: 1688828504,
      name: 'Kara Herman',
      email: 'Monte.Luettgen@hotmail.com',
      role: 'ROLE_ADMIN',
      password: 'BQLVT7LfY_CbkPF',
      id: '6'
    },
    {
      createdAt: 1688828444,
      name: 'Ignacio Baumbach',
      email: 'Moshe_Mayert@yahoo.com',
      role: 'ROLE_USER',
      password: 'IOPbuox2Kq5iFmy',
      id: '7'
    },
    {
      createdAt: 1688829829,
      name: 'Ms. Kim Langworth',
      email: 'Leone.Lowe@gmail.com',
      role: 'ROLE_USER',
      password: 'p5J63EhdqdIkREY',
      id: '8'
    },
    {
      createdAt: 1688829769,
      name: 'Willie Cronin',
      email: 'Ambrose.Littel@hotmail.com',
      role: 'ROLE_USER',
      password: 'mN64jQsAHupamQm',
      id: '9'
    },
    {
      createdAt: 1688829709,
      name: 'Travis Harber IV',
      email: 'Cordell.Olson59@hotmail.com',
      role: 'ROLE_USER',
      password: '6j1UWmHeRKQfSni',
      id: '10'
    },
    {
      createdAt: 1688899278,
      name: 'Shagun',
      email: 'shaggs@agm',
      role: 'ROLE_ADMIN',
      password: '4Vycy3oykxEy1i7',
      id: '11'
    },
    {
      createdAt: 1688933641,
      name: 'Sakshi',
      email: 'sakshikatyayen@test.com',
      role: 'ROLE_ADMIN',
      password: 'PIHHKuvT1LbSIS1',
      id: '12'
    }
  ]));

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      imports:[MatDialogModule,MatInputModule,MatButtonModule,MatInputModule,MatIconModule,MatSortModule,MatTableModule,HttpClientModule,RouterTestingModule,BrowserAnimationsModule],
      providers:[{provide: UsersService, useValue: userService},{provide: MatDialog, useValue: matDialog},HttpApiService]
    });
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
  it('should scroll the Mat Table--> onTableScroll()', () => {
    const container = fixture.debugElement.query(By.css('.users-table'));
    container.nativeElement.scrollTop = 11;
    container.nativeElement.dispatchEvent(new Event("scroll"));
    expect(container.nativeElement.scrollTop).toBeGreaterThan(0);

    container.nativeElement.scroll();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should search the users value--> filterUsers()', () => {
    const container = fixture.debugElement.query(By.css('.user-search'));
    container.nativeElement.value = 'Sak';
    container.nativeElement.dispatchEvent(new Event("keyup"));
    expect(container.nativeElement.value).toEqual('Sak');
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should search the users blank --> filterUsers()', () => {
    const container = fixture.debugElement.query(By.css('.user-search'));
    container.nativeElement.value = '';
    container.nativeElement.dispatchEvent(new Event("keyup"));
    expect(container.nativeElement.value).toEqual('');
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should edit user--> editUser()', () => {
    const container = fixture.debugElement.query(By.css('.edit-user-btn'));
    container.nativeElement.value = '';
    container.nativeElement.dispatchEvent(new Event("click"));
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should delete user --> deleteUser', () => {
    const container = fixture.debugElement.query(By.css('.delete-user-btn'));
    container.nativeElement.value = '';
    container.nativeElement.dispatchEvent(new Event("click"));
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should add user --> addUser()', () => {
    const container = fixture.debugElement.query(By.css('.add-user-btn'));
    container.nativeElement.value = '';
    container.nativeElement.dispatchEvent(new Event("click"));
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
