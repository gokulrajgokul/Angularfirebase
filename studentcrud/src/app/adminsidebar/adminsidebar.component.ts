// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-adminsidebar',
//   imports: [],
//   templateUrl: './adminsidebar.component.html',
//   styleUrl: './adminsidebar.component.css'
// })
// export class AdminsidebarComponent {

// }

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-adminsidebar',
  templateUrl: './adminsidebar.component.html',
  styleUrls: ['./adminsidebar.component.css'],
})
export class AdminSidebarComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  toggleMenu(): void {
    const sidebar = document.getElementById('sidebar') as HTMLElement | null;
    const content = document.getElementById('content') as HTMLElement | null;

    if (sidebar && content) {
      sidebar.classList.toggle('visible');
      content.classList.toggle('shifted');
    }
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }
}



