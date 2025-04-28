import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { RegisterService } from '../services/register.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  imports: [CommonModule, RouterModule]
})
export class SidebarComponent implements OnInit {
  username = '';
  role = '';

  constructor(
    private registerService: RegisterService,
    private router: Router  // ✅ Inject Router
  ) {}

  ngOnInit(): void {
    const user = this.registerService.getCurrentUser();
    if (user) {
      this.username = user.username;
      this.role = user.role;
    }
  }

  navigateTo(path: string) {   // ✅ This function is needed!
    this.router.navigate([path]);
  }

  logout() {
    this.registerService.logout();
  }
}
