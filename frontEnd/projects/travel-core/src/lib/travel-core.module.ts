import { NgModule } from '@angular/core';
import { TravelCoreComponent } from './travel-core.component';
import {APP_CONFIG, AppConfig} from './app.config';



@NgModule({
  declarations: [
    TravelCoreComponent
  ],
  imports: [
  ],
  exports: [
    TravelCoreComponent
  ],
  providers: [
    { provide: APP_CONFIG, useValue: {
        apiRoute: 'testRoute'
      } as AppConfig
    },
  ]
})
export class TravelCoreModule { }
