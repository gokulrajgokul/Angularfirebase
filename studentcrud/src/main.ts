import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));





  import { Injectable } from '@angular/core';
  import { HttpClient } from '@angular/common/http';
  
  @Injectable({
    providedIn: 'root'
  })
  export class FirebaseService {
    private dbUrl = 'https://angularintern-92770-default-rtdb.firebaseio.com/';
  
    constructor(private http: HttpClient) {}
  
    // Method to add intern and tasks using same ID
    addInternWithTasks(internData: any, tasksData: any, id: string) {
      // Add intern
      this.http.put(`${this.dbUrl}${id}.json`, internData).subscribe(res => {
        console.log('Intern added:', res);
      });
  
      // Add tasks using same ID
      this.http.put(`${this.dbUrl}tasks/${id}.json`, tasksData).subscribe(res => {
        console.log('Tasks added:', res);
      });
    }
  }
  



  // Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCTTqRH6SKbFSfzWHi2qlbxUjIYbzbsl3I",
  authDomain: "angularintern-92770.firebaseapp.com",
  databaseURL: "https://angularintern-92770-default-rtdb.firebaseio.com",
  projectId: "angularintern-92770",
  storageBucket: "angularintern-92770.firebasestorage.app",
  messagingSenderId: "787331786863",
  appId: "1:787331786863:web:55c2edccd9cf7235f4859a",
  measurementId: "G-4JCPFYEH98"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);