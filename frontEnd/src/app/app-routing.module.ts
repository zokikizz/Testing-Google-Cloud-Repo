import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TravelAuthComponent} from '../../projects/travel-auth/src/lib/travel-auth.component';
import {AppComponent} from './app.component';
import {TripListComponent} from '../../projects/trip/src/lib/trip-list/trip-list.component';
import {TripComponent} from '../../projects/trip/src/lib/trip/trip.component';

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
  },
  {
    path: 'trip',
    component: AppComponent,
    children: [
      { path: 'list', component: TripListComponent },
      { path: '', component: TripListComponent },
      {
        path: ':id',
        component: TripComponent
      }
    ]


  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
