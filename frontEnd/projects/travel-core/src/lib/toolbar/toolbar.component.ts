import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'lib-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {

  constructor(private router: Router) { }


  logOut(): void {
    localStorage.removeItem('auth');
    this.router.navigate(['/login']);
  }
}
