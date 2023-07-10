import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoaderComponent } from './loader/component/loader.component';


@NgModule({
  declarations: [LoaderComponent],
  imports: [
    CommonModule,
    MatProgressSpinnerModule
  ],
  exports:[LoaderComponent] 
})
export class SharedModule { }
