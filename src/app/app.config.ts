import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import {
  provideHttpClient,
  withInterceptors
} from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';

import { jwtInterceptor } from './core/interceptors/jwt.interceptor';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true },),
     provideRouter(routes),
      provideAnimations(),
      provideToastr(),
     provideHttpClient(
  withInterceptors([
    jwtInterceptor
  ])
)]
};
