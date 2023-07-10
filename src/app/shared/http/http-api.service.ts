import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { LoaderService } from '../loader/loader.service';

@Injectable({
  providedIn: 'root',
})
export class HttpApiService {

  pendingRequests: number = 0;

  constructor(private http: HttpClient, private loaderService: LoaderService) {}

  private addPendingRequest() { //used to maintain the active pending request count to show the loader
    this.pendingRequests++;
    this.updateLoading();
  }

  private removePendingRequest() { //reducing pending reuest count when request completes
    if(this.pendingRequests > 0){
      this.pendingRequests--;
    }
    this.updateLoading();
  }

  private updateLoading() {
    this.loaderService.setLoading(this.pendingRequests > 0); //setting the loading variable based on pending request count
  }

  public postApi<T, R>(
    url: string,
    data: T,
    showLoader = false
  ): Observable<R> {
    if(showLoader){
      this.addPendingRequest();
    }
    return this.http.post<R>(url, data).pipe(
      map((r) => {
        this.removePendingRequest();
        return r;
      })
    );
  }

  public getApi<R>(url: string, showLoader = false): Observable<R> { //added optional parameter in case to show loader
    if(showLoader){
      this.addPendingRequest();
    }
    return this.http.get<R>(url).pipe(
      map((r) => {
        this.removePendingRequest();
        return r;
      })
    );
  }

  public putApi<T, R>(url: string, data: T, showLoader = false): Observable<R> {
   
    if(showLoader){
      this.addPendingRequest();
    }
    return this.http.put<R>(url, data).pipe(
      map((r) => {
        this.removePendingRequest();
        return r;
      })
    );
  }
  public deleteApi<R>(url: string, showLoader = false): Observable<R> {
    if(showLoader){
      this.addPendingRequest();
    }
    return this.http.delete<R>(url).pipe(
      map((r) => {
        this.removePendingRequest();
        return r;
      })
    );
  }
}
