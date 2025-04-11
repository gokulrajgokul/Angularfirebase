import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.scss'],
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
