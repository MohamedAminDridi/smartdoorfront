import { Component, inject } from '@angular/core';
import { RegisterService } from '../services/register.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [CommonModule, FormsModule, HttpClientModule],
  providers: [RegisterService],
})
export class RegisterComponent {
  user = { username: '', password: '', role: 'client' }; // Default role is 'client'
  message = '';
  isAdmin = false;

  private registerService = inject(RegisterService);
  private router = inject(Router);

  ngOnInit() {
    // Check if the logged-in user is an admin
    const userRole = localStorage.getItem('role');
    this.isAdmin = userRole === 'admin';

    if (!this.isAdmin) {
      this.message = 'Unauthorized: Only admins can register new users.';
      setTimeout(() => this.router.navigate(['/']), 2000); // Redirect non-admins
    }
  }

  onSubmit() {
    if (!this.isAdmin) return;

    this.registerService.registerUser(this.user).subscribe({
      next: (response) => {
        console.log('Registration successful', response);
        this.message = 'Registration successful! ✅';
        this.user = { username: '', password: '', role: 'client' };
      },
      error: (error) => {
        console.error('Registration failed', error);
        this.message = 'Registration failed. ❌';
      },
    });
  }
}