import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TravelAuthComponent} from '../../projects/travel-auth/src/lib/travel-auth.component';
import {AppComponent} from './app.component';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: '',
        component: TravelAuthComponent,
      },
      {
        path: 'login',
        component: TravelAuthComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
