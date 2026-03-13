import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors } from "@angular/common/http";
// Importación para la versión 8.0.0 de ng2-charts
import { provideCharts, withDefaultRegisterables } from 'ng2-charts'; 
//Importacion de los interceptores de peticiones
import { loginInterceptor } from './core/interceptors/login-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes), 
    // http y clonacion de peticiones en el login
    provideHttpClient(withFetch(), withInterceptors([loginInterceptor])),
    provideCharts(withDefaultRegisterables())
  ]
};
