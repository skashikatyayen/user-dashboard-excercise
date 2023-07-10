import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard, UpdateGuard } from './service/user-permission.service';
import { UserUpdateComponent } from './components/user-update/user-update.component';
import { ViewUserComponent } from './components/view-user/view-user.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full',
  },
  {
    path: 'list',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    
  },
  {
    path: 'user/:id',
    component: UserUpdateComponent,
    canActivate: [UpdateGuard],
  },
  {
    path: 'user',
    component: UserUpdateComponent,
    canActivate: [UpdateGuard],
  },
  {
    path: 'view/user/:id',
    component: ViewUserComponent,
    canActivate: [AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserManagementRoutingModule {}
