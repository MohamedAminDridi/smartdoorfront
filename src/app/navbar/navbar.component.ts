import { Component } from '@angular/core';
import { RegisterService } from '../services/register.service';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  imports: [CommonModule],
  providers: [NavbarComponent],
})
export class NavbarComponent {
  constructor(public auth: RegisterService) {}

  logout() {
    this.auth.logout();
  }

  getRole(): string | null {
    return this.auth.getRole();
  }

  isLoggedIn(): boolean {
    return this.auth.isLoggedIn();
  }
}

