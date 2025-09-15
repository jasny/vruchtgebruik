import { bootstrapApplication } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';
import localeNl from '@angular/common/locales/nl';
import { appConfig } from './app/app.config';
import { App } from './app/app';

registerLocaleData(localeNl);
bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
