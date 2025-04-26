import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DoorService {
  //private apiUrl = 'https://your-backend-url.com/api/doors'; // change to your deployed backend
private apiUrl = environment.apiUrldoor;
  constructor(private http: HttpClient) {}

  /** 🔐 Helper to get auth headers */
  getAuthHeaders(): { headers: HttpHeaders; withCredentials: boolean } {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      }),
      withCredentials: true
    };
  }
  unlockDoor(ip: string): Observable<any> {
    return this.http.get(`http://${ip}/lock/on`);
  }
  
  /** 🔒 Lock a specific door */
  lockDoor(ip: string): Observable<any> {
    return this.http.get(`http://${ip}/lock/off`);
  }
  /** ✅ Get all doors */
  getDoors(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, this.getAuthHeaders());
  }

  /** ✅ Add a new door */
  addDoor(doorData: { doorName: string; ownerId: string }): Observable<any> {
    return this.http.post(this.apiUrl, doorData, this.getAuthHeaders());
  }

  /** ✅ Update door status */
  updateDoorStatus(doorId: string, status: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/update-status/${doorId}`, { status }, this.getAuthHeaders());
  }

  /** ✅ Remove a door by ID */
  removeDoor(doorId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${doorId}`, this.getAuthHeaders());
  }

  /** ✅ Add an owner to a door */
  addOwnerToDoor(doorId: string, userId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/add-owner`, { doorId, userId }, this.getAuthHeaders());
  }

  /** ✅ Remove an owner from a door */
  removeOwnerFromDoor(doorId: string, userId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/remove-owner?doorId=${doorId}&userId=${userId}`, this.getAuthHeaders());
  }

  /** ✅ Get owners of a specific door */
  getOwnersByDoorId(doorId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${doorId}/owners`, this.getAuthHeaders());
  }

  /** ✅ Get all users (for assigning door access) */
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>('https://smart-door-backend.onrender.com/api/auth', this.getAuthHeaders());
  }
//
updateDoorStatusWithLog(doorId: string, action: 'opened' | 'closed') {
  return this.http.post(`/api/doors/${doorId}/${action}`, {});
}

createLog(logData: any) {
  return this.http.post(`https://smart-door-backend.onrender.com/api/logs`, logData);
}
  // /** ✅ Log an access event (entry/exit) */
  // logAccess(doorId: string, ownerId: string, action: string): Observable<any> {
  //   return this.http.post(`${this.apiUrl}/log-access`, { doorId, ownerId, action }, this.getAuthHeaders());
  // }

  // /** ✅ Get access logs for a specific door */
  // getDoorLogs(doorId: string): Observable<any> {
  //   return this.http.get(`${this.apiUrl}/${doorId}/logs`, this.getAuthHeaders());
  // }
}