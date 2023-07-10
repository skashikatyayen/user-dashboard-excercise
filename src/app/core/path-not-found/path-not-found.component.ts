import { Component } from '@angular/core';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-path-not-found',
  templateUrl: './path-not-found.component.html',
  styleUrls: ['./path-not-found.component.scss']
})
export class PathNotFoundComponent {

constructor(private router : Router){

}

  navigateToDashboard(){
  this.router.navigate(['/dashboard']);
  }
}
