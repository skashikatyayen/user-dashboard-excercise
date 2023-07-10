import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateChildFn,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { LoginService } from 'src/app/core/auth/service/login.service';
import { ToastrService } from 'ngx-toastr';
import { ROLES } from 'src/app/shared/constants';

@Injectable({
  providedIn: 'root',
})
export class UserPermissionService {
  constructor(
    private router: Router,
    private loginService: LoginService,
    private toastr: ToastrService
  ) {}

  canActivate( //restricting route access based on role for User list and User view
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (
      this.loginService.getAuthToken() !== '' &&
      this.loginService.userData.role &&
      [ROLES['ROLE_ADMIN'].value, ROLES['ROLE_USER'].value].includes(
        this.loginService.userData.role
      )
    ) {
      return true;
    } else {
      this.router.navigate(['/login']);
      this.toastr.warning('you are not authorized');
      return false;
    }
  }

  canAccessUpdate( //restricting route access based on role for User edit and User delete
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (
      this.loginService.getAuthToken() !== '' &&
      this.loginService.userData.role &&
      [ROLES['ROLE_ADMIN'].value].includes(this.loginService.userData.role)
    ) {
      return true;
    } else if (
      this.loginService.getAuthToken() !== '' &&
      this.loginService.userData.role &&
      [ROLES['ROLE_USER'].value].includes(this.loginService.userData.role)
    ) {
      this.router.navigate(['/users/list']);
      this.toastr.warning('you do not have update permission');
      return false;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
//Below Guards given in user-management.app.routing.ts  with path

export const AuthGuard: CanActivateFn = ( 
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): boolean => {
  return inject(UserPermissionService).canActivate(next, state); 
};
export const UpdateGuard: CanActivateFn = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): boolean => {
  return inject(UserPermissionService).canAccessUpdate(next, state);
};
