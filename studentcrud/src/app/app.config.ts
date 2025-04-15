import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { getDataConnect, provideDataConnect } from '@angular/fire/data-connect';

import { provideTanStackQuery, QueryClient } from '@tanstack/angular-query-experimental';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), 
    provideClientHydration(withEventReplay()), 
    provideFirebaseApp(() => initializeApp({ projectId: "angularintern-92770", 
      appId: "1:787331786863:web:55c2edccd9cf7235f4859a", 
      databaseURL: "https://angularintern-92770-default-rtdb.firebaseio.com", 
      storageBucket: "angularintern-92770.firebasestorage.app", 
      apiKey: "AIzaSyCTTqRH6SKbFSfzWHi2qlbxUjIYbzbsl3I", 
      authDomain: "angularintern-92770.firebaseapp.com", 
      messagingSenderId: "787331786863", 
      measurementId: "G-4JCPFYEH98" })),
    provideAuth(() => getAuth()), 
    provideFirestore(() => getFirestore()),
    provideDatabase(() => getDatabase()),
    provideTanStackQuery(new QueryClient()),
    provideFirebaseApp(() => initializeApp({ projectId: "angularintern-92770", 
      appId: "1:787331786863:web:55c2edccd9cf7235f4859a",
      databaseURL: "https://angularintern-92770-default-rtdb.firebaseio.com", 
      storageBucket: "angularintern-92770.firebasestorage.app", 
      apiKey: "AIzaSyCTTqRH6SKbFSfzWHi2qlbxUjIYbzbsl3I", 
      authDomain: "angularintern-92770.firebaseapp.com",
      messagingSenderId: "787331786863", 
      measurementId: "G-4JCPFYEH98" })), 
   ]
};
