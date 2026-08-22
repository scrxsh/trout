import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideAppInitializer, inject, LOCALE_ID} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { provideClientHydration, withHttpTransferCacheOptions, withEventReplay } from '@angular/platform-browser';

// Importación para la versión 8.0.0 de ng2-charts
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
//Importacion de los interceptores de peticiones
import { loginInterceptor } from './core/interceptors/login-interceptor';
import { ThemeService } from './core/theme/services/theme.service';

import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';

registerLocaleData (localeEs)

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: LOCALE_ID, useValue: 'es' },
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),

    provideClientHydration(withHttpTransferCacheOptions({includePostRequests: false}), withEventReplay()),
    // http y clonacion de peticiones en el login
    provideHttpClient(withInterceptors([loginInterceptor])),
    provideCharts(withDefaultRegisterables()),

    provideAppInitializer(() => {
      inject(ThemeService).initialize();
    })
  ]
};
