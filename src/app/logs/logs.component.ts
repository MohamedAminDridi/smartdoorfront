// // import { Component, OnInit } from '@angular/core';
// // import { HttpClient } from '@angular/common/http';
// // import { CommonModule } from '@angular/common';
// // import { environment } from '../../environments/environment';

// // const API_URL = environment.apiUrl; // Get the API URL from the environment file

// // export interface Log {
// //   user: {
// //     name: string;
// //     email: string;
// //   };
// //   doorId: {
// //     name: string;
// //   };
// //   action: string;
// //   timestamp: string;
// // }

// // @Component({
// //   selector: 'app-logs',
// //   templateUrl: './logs.component.html',
// //   styleUrls: ['./logs.component.css'],
// //   standalone: true,
// //   imports: [CommonModule],
// // })
// // export class LogsComponent implements OnInit {
// //   logs: Log[] = [];

// //   constructor(private http: HttpClient) {}

// //   ngOnInit(): void {
// //     this.fetchLogs();
// //   }

// //   fetchLogs(): void {
// //     const url = localStorage.getItem('role') === 'admin'
// //       ? `${API_URL}/logs`
// //       : `${API_URL}/logs/user`; // Change URL based on role
    
// //     this.http.get<Log[]>(url, {
// //       headers: {
// //         Authorization: `Bearer ${localStorage.getItem('token')}`
// //       }
// //     }).subscribe({
// //       next: data => {
// //         this.logs = data;
// //       },
// //       error: err => {
// //         console.error("Failed to load logs", err);
// //       }
// //     });
// //   }

// //   formatDate(date: string): string {
// //     return new Date(date).toLocaleString();
// //   }
// // }
// import { Component, OnInit } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { CommonModule } from '@angular/common';
// export interface Log {
//     user: {
//       name: string;
//       email: string;
//     };
//     doorId: {
//       name: string;
//     };
//     action: string;
//     timestamp: string;
//   }
// @Component({
//   selector: 'app-logs',
//   templateUrl: './logs.component.html',
//   styleUrls: ['./logs.component.css'],
//   standalone: true,
//  imports: [CommonModule],
// })
// export class LogsComponent implements OnInit {
//   logs = [];

//   constructor(private http: HttpClient) {}

//   ngOnInit(): void {
//     this.getLogs(); // Call getLogs when the component is initialized
//   }

//   getLogs() {
//     const token = localStorage.getItem('authToken'); // Get the token from localStorage (or sessionStorage)
//     if (!token) {
//       console.error('No authentication token found!');
//       return;
//     }

//     const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
//     // Make the GET request to fetch logs
//     this.http.get('https://your-backend-api-url/api/logs', { headers })
//       .subscribe(
//         (response: any) => {
//           this.logs = response; // Set logs to the response
//         },
//         (error) => {
//           console.error('Error fetching logs:', error);
//         }
//       );
//   }

//   // Optional: format the timestamp to a more readable format
//   formatDate(date: string): string {
//     const formattedDate = new Date(date);
//     return formattedDate.toLocaleString(); // Example: '4/26/2025, 4:30:00 PM'
//   }
// }
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';

// Define the structure of a Log object
export interface Log {
  user: { username: string };
  doorId: { name: string };
  action: string;
  timestamp: string;
}

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css'],
  standalone: true,
 imports: [CommonModule],
})
export class LogsComponent implements OnInit {
  logs: Log[] = []; // Declare the logs array with the Log type
  sortDirection: 'asc' | 'desc' = 'asc';
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getLogs(); // Fetch logs when the component is initialized
  }

  getLogs() {
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('No authentication token found!');
      return;
    }

    const headers = {
      'Authorization': `Bearer ${token}`
    };

    this.http.get<any[]>('https://smart-door-backend.onrender.com/api/logs', { headers })
      .subscribe(
        (data) => {
          this.logs = data;
        },
        (error) => {
          console.error('Failed to load logs', error);
        }
      );
  }

  formatDate(date: string): string {
    const formattedDate = new Date(date);
    return formattedDate.toLocaleString(); // Format the date for readability
  }
  sortLogsByTimestamp() {
    this.logs.sort((a, b) => {
      const timestampA = new Date(a.timestamp).getTime();
      const timestampB = new Date(b.timestamp).getTime();
      return this.sortDirection === 'asc' ? timestampA - timestampB : timestampB - timestampA;
    });
  }

  // Toggle sorting direction
  toggleSortDirection() {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.sortLogsByTimestamp(); // Re-sort logs after toggling the direction
  }
}
