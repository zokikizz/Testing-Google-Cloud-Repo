import {InjectionToken} from '@angular/core';

export interface AppConfig {
  apiRoute?: string;
}


export const APP_CONFIG = new InjectionToken<AppConfig>('travelАpp.config');
