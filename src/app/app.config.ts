import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { RegisterService } from './services/register.service'; // 👈 import it

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),  // ✅
    provideHttpClient(),    // ✅ needed for services with HttpClient
    RegisterService,        // ✅ needed for Sidebar
  ],
};
