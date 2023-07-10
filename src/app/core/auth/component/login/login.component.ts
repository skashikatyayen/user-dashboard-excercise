import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { LoginService } from '../../service/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm = this.fb.group({
    username: [''],
    password: [''],
  });

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {}

  login() {
    const username = this.loginForm.controls.username?.value;
    const password = this.loginForm.controls.password?.value;
    if (username && password) {
      this.loginService.verifyUser(username, password).subscribe((res) => {
        if (res) {
          localStorage.setItem('user', JSON.stringify(res));

          this.router.navigate(['/users']);
        }
      });
    }
  }
}
