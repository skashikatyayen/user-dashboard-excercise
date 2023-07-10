import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ROLES_ARR } from 'src/app/shared/constants';
import { UsersService } from '../../service/users.service';
import { UserDetails } from '../../model/users.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.scss'],
})
export class UserUpdateComponent implements OnInit {
  userId: string;
  isEditFlow: boolean = false;
  userObj: UserDetails;
  userForm: FormGroup;
  requestPending = false;

  userRoles = ROLES_ARR;
  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private userService: UsersService,
    private taostr: ToastrService,
    private router: Router
  ) {
    this.userId = this.activatedRoute.snapshot.params['id']; //geting route parameter to determine add/Edit flow
  }
  ngOnInit() {
    this.isEditFlow = this.userId ? true : false;

    if (this.isEditFlow) { //for edit flow details will prepopulate from API
      this.userService.getUserDetails(this.userId).subscribe((user) => {
        this.userObj = user;
        this.initializeForm();
      });
    } else { //for add flow user details will be default that is blank
      this.userObj = {
        name: '',
        email: '',
        role: '',
      };
      this.initializeForm();
    }
  }

  private initializeForm() {
    this.userForm = this.fb.group({
      username: [
        this.userObj.name,
        [Validators.required, Validators.minLength(6)],
      ],
      email: [this.userObj.email, [Validators.required, Validators.email]],
      role: [this.userObj.role, Validators.required],
    });
  }

  updateUser() {
    //reassigning userObj from FormControls
    this.userObj.name = this.userForm.controls['username'].value;
    this.userObj.email = this.userForm.controls['email'].value;
    this.userObj.role = this.userForm.controls['role'].value;
    this.requestPending = true;//for showing spinner and restricting another CTA till the API request is completed
    if (this.isEditFlow) { //calling put Api based on edit flow 
      this.userService.updateUserDetails(this.userObj).subscribe({
        next: (user) => {
          this.taostr.success('User Updated Successfully');
          this.router.navigate(['/users/list']);
        },
        complete: () => {
          this.requestPending = false;
        },
      });
    } else { //calling post Api based on add flow 
      this.userObj.id = Math.random().toString(); //creating random id user id(should be done on backend but doing on UI to facilitate mock API)
      this.userService.createUserDetails(this.userObj).subscribe({
        next: (user) => {
          this.taostr.success('User Created Successfully');
          this.router.navigate(['/users/list']);
        },
        complete: () => {
          this.requestPending = false;
        },
      });
    }
  }
  get formCtrl(): { [key: string]: AbstractControl } {//getting controls to use in html
    return this.userForm.controls;  
  }

  get formValid(): boolean { //using for disabling add/edit click event
    return this.userForm.status === 'VALID';
  }
}
