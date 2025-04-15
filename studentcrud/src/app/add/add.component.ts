// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-add',
//   imports: [],
//   templateUrl: './add.component.html',
//   styleUrl: './add.component.css'
// })
// export class AddComponent {

// }
// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-add',
//   templateUrl: './add.component.html',
//   styleUrls: ['./add.component.css']
// })
// export class AddComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }



// src/app/add/add.component.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Database, ref, set } from '@angular/fire/database';
import { Add } from '../models/add.model';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl:'./add.component.html' ,
})
export class AddComponent {
  data: Add = {
    name: '',
    email: '',
    tasktitle: '',
    description: '',
    srtdate: new Date(),
    enddate: new Date()
  };

  constructor(private db: Database) {}

  saveData() {
    const taskId = this.data.name + '-' + Date.now(); // Unique key for each entry
    const dbRef = ref(this.db, 'tasks/' + taskId);

    set(dbRef, this.data)
      .then(() => {
        alert('Data saved successfully!');
        this.resetForm();
      })
      .catch((error) => {
        console.error('Error saving data: ', error);
      });
  }

  resetForm() {
    this.data = {
      name: '',
      email: '',
      tasktitle: '',
      description: '',
      srtdate: new Date(),
      enddate: new Date()
    };
  }
}
