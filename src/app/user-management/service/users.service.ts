import { Injectable } from '@angular/core';
import { API_URLS } from 'src/app/shared/constants';
import { HttpApiService } from 'src/app/shared/http/http-api.service';
import { UserDetails } from '../model/users.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private apiService: HttpApiService) {}

  public getUsersList(): Observable<Array<UserDetails>> {
    const apiResponse = this.apiService.getApi<Array<UserDetails>>(API_URLS.users, true);
    return apiResponse;
  }

  public getUserDetails(id:string):Observable<UserDetails> {
    const url= API_URLS.user.replace("{userId}",id);
    const apiResponse = this.apiService.getApi<UserDetails>(url, true);
    return apiResponse;
  }
  public createUserDetails(data:UserDetails):Observable<UserDetails> {
    const url= API_URLS.users;
    const apiResponse = this.apiService.postApi<UserDetails,UserDetails>(url,data);
    return apiResponse;
  }

  public updateUserDetails(data:UserDetails):Observable<UserDetails> {
    const url= API_URLS.user.replace("{userId}",data.id!)
    const apiResponse = this.apiService.putApi<UserDetails,UserDetails>(url,data);
    return apiResponse;
  }
  public deleteUserDetails(id:string):Observable<UserDetails> {
    const url= API_URLS.user.replace("{userId}",id);
    const apiResponse = this.apiService.deleteApi<UserDetails>(url);
    return apiResponse;
  }

}


