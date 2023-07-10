import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  loaderObservable = new BehaviorSubject(false);

  constructor() { }

  setLoading(loading: boolean) {
    this.loaderObservable.next(loading);
  }

}
