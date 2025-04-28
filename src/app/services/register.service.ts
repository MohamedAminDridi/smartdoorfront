import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
interface CurrentUser {
  username: string;
  role: string;
}

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private router: Router) {}

  // Register a new user
  registerUser(user: any): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error("❌ No token found, login first.");
      return new Observable(observer => {
        observer.error({ error: "No token found" });
      });
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    return this.http.post(`${this.apiUrl}/register`, user, { headers });
  }

  // Login a user
  login(user: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, user, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      withCredentials: true
    });
  }

  // Logout
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('role');
    this.router.navigate(['/login']);
  }
  getToken() {
    return localStorage.getItem('token');
  }

  getCurrentUser(): CurrentUser | null {
  const username = localStorage.getItem('username');
  const role = localStorage.getItem('role');

  if (!username || !role) {
    return null;
  }

  return { username, role };
}

 
  // Check if user is logged in
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }



  saveUserInfo(userId: string, role: string, username: string) {
    localStorage.setItem('userId', userId);
    localStorage.setItem('role', role);
    localStorage.setItem('username', username);
  }

  getRole(): string | null {
    return localStorage.getItem('role');
  }

  getUserId(): string | null {
    return localStorage.getItem('userId');
  }
}
