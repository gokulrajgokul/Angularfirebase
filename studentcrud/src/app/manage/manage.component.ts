// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-manage',
//   imports: [],
//   templateUrl: './manage.component.html',
//   styleUrl: './manage.component.css'
// })
// export class ManageComponent {

// }



// chatgpt

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true, // Important for standalone components
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css'],
  imports: [CommonModule] // Required for *ngFor, *ngIf, etc.
})
export class ManageComponent {
  tasks: any[] = [
    { title: 'Task 1', description: 'Description 1' },
    { title: 'Task 2', description: 'Description 2' }
  ];

  deleteTask(index: number): void {
    this.tasks.splice(index, 1);
  }
}


// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { ManageComponent } from './manage.component';

// describe('ManageComponent', () => {
//   let component: ManageComponent;
//   let fixture: ComponentFixture<ManageComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [ ManageComponent ]
//     })
//     .compileComponents();
//   });

//   beforeEach(() => {
//     fixture = TestBed.createComponent(ManageComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });