import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpApiService } from 'src/app/shared/http/http-api.service';
import { LoginRequest, UserData } from '../model/model';
import { API_URLS } from 'src/app/shared/constants';




@Injectable({
  providedIn: 'root',
})
export class LoginService {
  userData: UserData = {};
  constructor(private apiService: HttpApiService) {}

  verifyUser(username: string, password: string):Observable <UserData>{
    const loginRequest: LoginRequest = {username: username, password: password};
   const apiResponse =  this.apiService
      .postApi<LoginRequest, UserData>(API_URLS.login,loginRequest);

      return apiResponse;
  }
  getAuthToken() {
    let userDetails = localStorage.getItem('user');
    let token: string | undefined = '';
    if(userDetails){
    this.userData= JSON.parse(userDetails);
    token =  this.userData?.token;
    }

    return token;
  }

  
}
