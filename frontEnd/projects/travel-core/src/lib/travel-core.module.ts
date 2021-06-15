import { NgModule } from '@angular/core';
import { TravelCoreComponent } from './travel-core.component';
import {APP_CONFIG, AppConfig} from './app.config';
import { ToolbarComponent } from './toolbar/toolbar.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';



@NgModule({
  declarations: [
    TravelCoreComponent,
    ToolbarComponent
  ],
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [
    TravelCoreComponent,
    ToolbarComponent,
  ],
  providers: [
    // { provide: APP_CONFIG, useValue: {
    //     apiRoute: 'testRoute'
    //   } as AppConfig
    // },
  ]
})
export class TravelCoreModule { }
