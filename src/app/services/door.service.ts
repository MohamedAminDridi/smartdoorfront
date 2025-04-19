import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DoorService {
  private apiUrl = 'http://localhost:5000/api/doors';

  constructor(private http: HttpClient) {}

  getAuthHeaders() {
    const token = localStorage.getItem('token');
    return token ? { headers: new HttpHeaders({ Authorization: `Bearer ${token}` }) } : {};
  }
  updateDoorStatus(doorId: string, status: string) {
    return this.http.put<any>(`http://localhost:5000/api/doors/update-status/${doorId}`, { status });
  }
 // getDoors() {
 //   return this.http.get(this.apiUrl, this.getAuthHeaders());
 // }
  getUsers() {
    return this.http.get<any[]>('http://localhost:5000/api/auth'); // Adjust API endpoint if needed
  }
  addDoor(doorData: { doorName: string; ownerId: string }): Observable<any> {
    return this.http.post('http://localhost:5000/api/doors', doorData);
  }
  removeOwner(doorId: string, ownerId: string) {
    return this.http.delete(`${this.apiUrl}/${doorId}/owners/${ownerId}`);
  }
  // ✅ Remove a door by ID
  removeDoor(doorId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${doorId}`);
  }
  addOwner(doorId: string, ownerId: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/add-owner`, { doorId, ownerId });
  }
  getDoors(): Observable<any[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  
    return this.http.get<any[]>(this.apiUrl, { headers });
  }
  // Log access (entry/exit)
  logAccess(doorId: string, ownerId: string, action: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/log-access`, { doorId, ownerId, action });
  }

  // Get logs for a specific door
  getDoorLogs(doorId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${doorId}/logs`);
  }
   /** ✅ Add an owner to a door */
   addOwnerToDoor(doorId: string, userId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/add-owner`, { doorId, userId });
  }

  /** ✅ Remove an owner from a door */
  removeOwnerFromDoor(doorId: string, userId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/remove-owner?doorId=${doorId}&userId=${userId}`);
  }

  /** ✅ Get owners of a door */
  getOwnersByDoorId(doorId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${doorId}/owners`);
  }
}
