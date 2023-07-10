import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { UserDetails } from '../../model/users.model';
import { UsersService } from '../../service/users.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.scss'],
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
})
export class DeleteUserComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: UserDetails, //data passed from dashboard component to use in dialog component
    private userService: UsersService,
    private toastr: ToastrService
  ) {}

  deleteUser() {
    this.userService.deleteUserDetails(this.data.id!).subscribe({
      next:(res)=>{
        console.log(res,"delete API");
        this.toastr.success("User deleted Successfully");
      },
      complete:()=>{

      },
      error:(err)=>{

      }
    });
  }
}
