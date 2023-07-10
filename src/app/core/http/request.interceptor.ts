import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { LoginService } from '../auth/service/login.service';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  constructor(private loginService: LoginService, private toaster : ToastrService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {

    return next.handle(this.addAuthToken(request)).pipe(catchError((errorResponse: HttpErrorResponse) => {
      console.log(`Http API Error Occured ${errorResponse.status} ${errorResponse.message}`); //logging the request error
      const message = errorResponse?.error?.message ? errorResponse?.error?.message : "Error Occurred. Please try again.";
      this.toaster.error(message);  //showing message to user in case of http error
      return throwError(() => errorResponse); 

    }));
  }

  addAuthToken(request: HttpRequest<any>) { //setting authorization token in request headers
    const token = this.loginService.getAuthToken();

    if (!token) {
      return request;
    }

    return request.clone({
      setHeaders: {
        Authorization: token,
      },
    });
  }
}
