import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoaderService } from '../loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {
  loading = false;
  subscription: Subscription;
  constructor(public loader: LoaderService) { }

  ngOnInit(): void {
    this.subscription = this.loader.loaderObservable.subscribe(loading => {
      this.loading = loading;
    });
  }

  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }
 
}
