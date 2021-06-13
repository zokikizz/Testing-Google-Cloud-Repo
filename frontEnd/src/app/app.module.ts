import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {TravelAuthModule} from '../../projects/travel-auth/src/lib/travel-auth.module';
import {APP_CONFIG, AppConfig} from '../../projects/travel-core/src/lib/app.config';
import {FacebookLoginProvider, SocialAuthServiceConfig, SocialLoginModule} from 'angularx-social-login';

const appConfigFactory = () => ({
    baseUrl: 'testUrl'
  } as AppConfig);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SocialLoginModule,
    TravelAuthModule,
  ],
  providers: [
    {
      provide: APP_CONFIG,
      useFactory: appConfigFactory,
      deps: []
    },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('3998204443604240')
          }
        ]
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
