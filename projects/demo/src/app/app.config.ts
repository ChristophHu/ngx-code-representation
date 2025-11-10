import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHighlightJsConfig } from 'ngx-highlight-js';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHighlightJsConfig({
      lang: 'html',
      // theme: 'atom-one-dark',
      // lineNumbers: true
    }),
    provideZonelessChangeDetection(),
    provideRouter(routes)
  ]
};
