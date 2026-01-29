import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { initializeApp, provideFirebaseApp, getApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideFirestore, initializeFirestore } from '@angular/fire/firestore';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),

    provideFirebaseApp(() => initializeApp(environment.firebase)),

    provideFirestore(() => {
      const app = getApp();

      return initializeFirestore(app, {
        experimentalForceLongPolling: true,
      });
    }),
  ]
};
