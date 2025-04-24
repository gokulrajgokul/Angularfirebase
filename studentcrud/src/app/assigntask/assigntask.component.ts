import { Component, OnInit, inject, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Database, ref, set, onValue } from '@angular/fire/database';
import { Add } from '../models/add.model';

@Component({
  selector: 'app-assigntask',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './assigntask.component.html',
  styleUrl: './assigntask.component.css'
})
export class AssigntaskComponent implements OnInit {
  data: Add = {
    id:0,
    name: '',
    tasktitle: '',
    description: '',
    srtdate: new Date(),
    enddate: new Date()
  };

  internList: any[] = [];
  taskList: any[] = [];

  private db = inject(Database);
  private ngZone = inject(NgZone);

  ngOnInit(): void {
    // Load intern list
    const internRef = ref(this.db, 'intern/');
    onValue(internRef, (snapshot) => {
      this.ngZone.run(() => {
        const data = snapshot.val();
        this.internList = [];
        if (data) {
          for (let key in data) {
            this.internList.push(data[key]);
          }
        }
      });
    });

    // Load task list
    const taskRef = ref(this.db, 'tasks/');
    onValue(taskRef, (snapshot) => {
      this.ngZone.run(() => {
        const tasks = snapshot.val();
        this.taskList = [];
        if (tasks) {
          for (let key in tasks) {
            this.taskList.push(tasks[key]);
          }
        }
      });
    });
  }

  saveData() {
    const taskId = this.data.name + '-' + Date.now(); 
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
      id: 0,  // Include id here
      name: '',
      tasktitle: '',
      description: '',
      srtdate: new Date(),
      enddate: new Date()
    };
  }
}


