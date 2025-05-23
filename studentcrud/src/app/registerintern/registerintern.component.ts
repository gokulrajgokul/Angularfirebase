import { Component } from '@angular/core';
import { Database, ref, set } from '@angular/fire/database';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-registerintern',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './registerintern.component.html',
  styleUrls: ['./registerintern.component.css']
})
export class RegisterinternComponent {
  data: any = {
    name: '',
    password: '',
    email: '',
    domain: '',
    duration: '',
    date: '',
    whatsapp: '',
    collegename: '',
    passyear: '',
    degree: '',
    department: '',
    internmode: '',
    location: ''
  };

  
  internId: string = '';

  constructor(private db: Database) {}
  // saveData() {
  //   const internId = this.data.name + '-' + Date.now();
  //   const dbRef = ref(this.db, 'intern/' + internId);
  
  //   const dataWithId = { ...this.data, id: internId }; // include id
  
  //   set(dbRef, dataWithId)
  //     .then(() => {
  //       alert('Intern registered successfully!');
  //       this.resetForm();
  //     })
  //     .catch((error) => {
  //       console.error('Error saving intern data: ', error);
  //     });
  // }
  saveData() {
    this.internId = this.data.name + '-' + Date.now();
    const dbRef = ref(this.db, 'intern/' + this.internId);
  
    const dataWithId = { ...this.data, id: this.internId };
  
    set(dbRef, dataWithId)
      .then(() => {
        alert('Intern registered successfully!');
        // Keep the ID so it can be used for payment
      })
      .catch((error) => {
        console.error('Error saving intern data: ', error);
      });
  }
  
  resetForm() {
    this.data = {
      name: '',
      password: '',
      email: '',
      domain: '',
      duration: '',
      date: '',
      whatsapp: '',
      collegename: '',
      passyear: '',
      degree: '',
      department: '',
      internmode: '',
      location: ''
    };
  }
}
