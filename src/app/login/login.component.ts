import { Component, inject } from '@angular/core';
import { RegisterService } from '../services/register.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; import { Router } from '@angular/router';

// @Component({
//   selector: 'app-login',
//   standalone: true,
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css'],
//   imports: [CommonModule, FormsModule, HttpClientModule],
//   providers: [RegisterService],
// })

// export class LoginComponent {
//   user = { username: '', password: '',};
//   message = '';

//   private registerService = inject(RegisterService);
//   private router = inject(Router); // ✅ Inject Router

//   onSubmit() {
//     this.registerService.login(this.user).subscribe({
//       next: (response: any) => {
//         console.log('Full API Response:', response);  // Debugging step
//         localStorage.setItem('token', response.token);
//         localStorage.setItem('userId', response.user._id);
//         localStorage.setItem('role', response.user.role);
//         console.log('✅ Login successful');
//         console.log('Token Saved:', localStorage.getItem('token')); 

        
//         // ✅ Navigate to doors page
//         if (response.user.role === 'admin') {
//           localStorage.setItem('token', response.token);
// console.log('Token Saved:', localStorage.getItem('token'));
//           this.router.navigate(['/door']);
//         } else {
//           this.router.navigate(['/client']);
//         }
//       },
//       error: (error) => {
//         console.error('❌ Login failed', error);
//         this.message = 'Invalid username or password';
//       }
      
//     });
  
//   }
// }
// import { Component, inject } from '@angular/core';
// import { RegisterService } from '../services/register.service';
// import { Router } from '@angular/router';

@Component({
   selector: 'app-login',
   standalone: true,
    templateUrl: './login.component.html',
   styleUrls: ['./login.component.css'],
   imports: [CommonModule, FormsModule, HttpClientModule],
   providers: [RegisterService],
 })
export class LoginComponent {
  user = { username: '', password: '' };
  message = '';

  private registerService = inject(RegisterService);
  private router = inject(Router);

  onSubmit() {
    this.registerService.login(this.user).subscribe({
      next: (response) => {
        console.log('Login Response:', response);
        localStorage.setItem('token', response.token);
        localStorage.setItem('userId', response.user._id);
        localStorage.setItem('role', response.user.role);

        // Navigate to the appropriate page based on user role
        if (response.user.role === 'admin') {
          this.router.navigate(['/door']);
        } else {
          this.router.navigate(['/client']);
        }
      },
      error: (error) => {
        this.message = 'Invalid username or password';
      },
    });
  }
}
