import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../../service/users.service';
import { UserDetails } from '../../model/users.model';
import { ROLES } from 'src/app/shared/constants';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss']
})
export class ViewUserComponent implements OnInit{
  userId: string;
  userObj: UserDetails;
  userRoles = ROLES;
  constructor(private activatedRoute: ActivatedRoute,
    private userService: UsersService){
      this.userId = this.activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.userService.getUserDetails(this.userId).subscribe((user) => {
      this.userObj = user; //populating userObj from API to show on UI
    });
  } 
  
}
