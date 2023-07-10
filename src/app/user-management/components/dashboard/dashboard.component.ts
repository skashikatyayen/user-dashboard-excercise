import { Component, OnInit, ViewChild } from '@angular/core';
import { UsersService } from '../../service/users.service';
import { UserDetails } from '../../model/users.model';
import { MatDialog } from '@angular/material/dialog';
import { DeleteUserComponent } from '../delete-user/delete-user.component';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ROLES } from 'src/app/shared/constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  usersList: Array<UserDetails> = [];
  usersListAll: Array<UserDetails> = [];
  displayedColumns = ['name', 'email', 'role', 'actions'];
  usersDataSource = new MatTableDataSource(this.usersList);
  userRoles = ROLES;
  usersLoading = false; //to prevent multiple api calls while scrolling
  constructor(
    private userService: UsersService,
    private router: Router,
    private dialog: MatDialog
  ) {}
  ngOnInit() {
    this.getUsers();
  }
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.usersDataSource.sort = this.sort; //sorting users
  }
  getUsers(append = false) {
    this.usersLoading = true;
    this.userService.getUsersList().subscribe({
      next: (res) => {
        if(!append){
          this.usersListAll = res;
          this.usersList = [...res];
          
        } else {
          this.usersListAll = [...this.usersListAll, ...res]; //appending users upon scrolling
          this.usersList = [...this.usersList, ...res];
        }
  
        this.usersDataSource.data = this.usersList;
        
      },
      complete: ()=>{
        this.usersLoading = false; //call api after the previous request is completed
      }
    });
  }
  deleteUser(user: UserDetails) {
    const dialogRef = this.dialog.open(DeleteUserComponent, {
      data: user,
      height: '200px',
      width: '450px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'yes') { //exceutes when user choose to delete user in delete Dialog"
        this.getUsers();
      }
    });
  }
  onTableScroll(event: Event) { //Infinite Scrolling 
    const target = event.target as HTMLElement;
    const tableViewHeight = target!.offsetHeight // viewport of mat-table
    const tableScrollHeight = target.scrollHeight // actula length of mat-table 
    const scrollLocation = target.scrollTop; // how far user has scrolled
    
    // If the user has scrolled within 50px of the bottom, add more data
    const buffer = 50;
    const limit = tableScrollHeight - tableViewHeight - buffer;   
    console.log("viewport",tableViewHeight) ;
    console.log("actual height",tableScrollHeight) ;
    console.log("scroll location",scrollLocation) ;
    console.log("limit",limit) ;
    if (scrollLocation > limit && !this.usersLoading) {
      this.getUsers(true);
    }
  }

  editUser(user: UserDetails) {
    this.router.navigate(['/users/user', user.id]
    );
  }
  filterUsers(searchVal: string) {  //filtering users with matched type sting in all applicable columns
    console.log(searchVal);
    searchVal = searchVal.toLowerCase();
    if (searchVal) {
      this.usersList = this.usersListAll.filter((u) => {
        const userNameSearch = u.name?.toLowerCase().includes(searchVal);
        const emailSearch = u.email?.toLowerCase().includes(searchVal);
        const roleSearch = u.role?.toLowerCase().includes(searchVal);
        return (
          (userNameSearch || emailSearch || roleSearch)
        );
      });
    } else {
      this.usersList = [...this.usersListAll];
      
    }
    this.usersDataSource.data = this.usersList;
  }
  addUser() {
    this.router.navigate(['/users/user']);
  }
}
