import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root', // Makes it available globally
})
export class RegisterService {
  private apiUrl =  environment.apiUrl; // 🔥 Change this to your backend API URL

  constructor(private http: HttpClient, private router: Router) {}

  // Method to send form data to the backend
  registerUser(user: any): Observable<any> {
    const token = localStorage.getItem('token'); // ✅ Retrieve token

    if (!token) {
      console.error("❌ No token found, login first.");
      return new Observable(observer => {
        observer.error({ error: "No token found" });
      });
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    console.log("Sending request with headers:", headers); // Debugging
    return this.http.post(`${this.apiUrl}/register`, user, { headers });
  }
  login(user:{username: string, password: string}): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, user);
  }
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
