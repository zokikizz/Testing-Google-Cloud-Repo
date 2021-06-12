import {InjectionToken} from '@angular/core';

export interface AppConfig {
  baseUrl: string;
}

export const APP_CONFIG = new InjectionToken<AppConfig>('travel.AppConfig');
