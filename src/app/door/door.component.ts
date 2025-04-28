import { Component, OnInit, inject } from '@angular/core';
import { DoorService } from '../services/door.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
@Component({
  selector: 'app-doors',
  standalone: true,
  templateUrl: './door.component.html',
  styleUrls: ['./door.component.css'],
  imports: [CommonModule, FormsModule, HttpClientModule],
  providers: [DoorService],
})
export class DoorComponent implements OnInit {
  doors: any[] = [];
  users: any[] = [];
  newDoor = { name: '', location: '' };
  private doorService = inject(DoorService);
  isAdmin = localStorage.getItem('role') === 'admin';
  private http = inject(HttpClient); // ✅ Inject HttpClient
  private API_URL = environment.apiUrldoor;
  //private Api_url = 'http://localhost:5000/api/doors-by-owner';
  selectedUser: string = ''; 
  constructor(private router: Router) {}

  navigateToRegister() {
    this.router.navigate(['/register']);
  }
  
  ngOnInit() {
    this.loadUsers(); // Load users (if needed)
  
    const userRole = localStorage.getItem('role'); // Fetch role from storage
    const userId = localStorage.getItem('userId'); // Fetch user ID
  
    if (!userRole || !userId) {
      console.error('No user role or user ID found in localStorage');
      return;
    }
  
    if (userRole === 'admin') {
      this.loadDoors(); // Admin loads all doors
    } else {
      this.loadUserDoors(userId); // Client loads only assigned doors
    }
  }
  loadUserDoors(userId: string) {
    this.http.get(`${this.API_URL}?userId=${userId}`).subscribe({
      next: (data: any) => {
        this.doors = data; // Store only assigned doors
      },
      error: (err) => console.error('Error loading user doors:', err),
    });
  }
  loadUsers() {
    this.doorService.getUsers().subscribe({
      next: (data: any) => this.users = data,
      error: (err:any) => console.error('Error loading users:', err)
    });
  }

  getDoorImage(status: string): string {
    return status === 'open'
      ? '/assets/images/green.jpg' 
    : '/assets/images/red.jpg';}
    toggleDoorStatus(door: any) {
      // Flip the status
      door.status = door.status === 'open' ? 'closed' : 'open';
    
      // Update the door status on the server
      this.doorService.updateDoorStatus(door._id, door.status).subscribe(
        (updatedDoor) => {
          console.log('Door status updated:', updatedDoor);
    
          // AFTER successful update => Create a new log
          const log = {
            user: localStorage.getItem('userId'), // who's doing the action
            doorId: door._id,
            action: door.status === 'open' ? 'opened' : 'closed', // map door status to action
            timestamp: new Date()
          };
          this.doorService.createLog(log).subscribe(
            (savedLog) => {
              console.log('Log saved successfully:', savedLog);
            },
            (error) => {
              console.error('Error saving log:', error);
            }
          );
    
        },
        (error) => {
          console.error('Error updating door status:', error);
        }
      );
    }
  toggleLED(state: string) {
    this.http.post(`${this.API_URL}/led/${state}`, {}).subscribe({
      next: (response) => {
        console.log('✅ LED Response:', response);
      },
      error: (err) => {
        console.error('❌ LED Control Error:', err);
      }
    });
  }

  // ✅ Load all doors
  loadDoors() {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token'); // 🔥 Get token from storage
  
    if (!token) {
      console.error('❌ No token found, user might not be authenticated.');
      return;
    }
  
    let url = this.isAdmin ? this.API_URL : `${this.API_URL}?userId=${userId}`;
  
    this.http.get(url, {
      headers: { Authorization: `Bearer ${token}` } // ✅ Attach token in headers
    }).subscribe({
      next: (data: any) => this.doors = data,
      error: (err) => console.error('❌ Error loading doors:', err)
    });
  }
  

  // ✅ Add new door
  addDoor() {
    if (!this.isAdmin) return;
  
    const ownerId = localStorage.getItem('userId'); 
    if (!ownerId) {
      console.error('❌ Error: Owner ID not found in localStorage');
      return;
    }
  
    const doorData = {
      doorName: this.newDoor.name, // ✅ Ensure the correct key name
      ownerId: ownerId
    };
  
    this.doorService.addDoor(doorData).subscribe({
      next: (response: any) => {
        console.log("✅ Door added successfully", response);
        this.doors.push(response.door);
        this.newDoor = { name: '',location: '' }; // ✅ Reset input fields
      },
      error: (err) => {
        console.error('❌ Error adding door:', err);
      }
    });
  }
  
  removeDoor(doorId: string) {
    if (!this.isAdmin) return; // Prevent non-admins from removing doors
    this.doorService.removeDoor(doorId).subscribe(() => {
      this.doors = this.doors.filter(door => door._id !== doorId);
    });
  }

  // logAccess(doorId: string, action: string) {
  //   const ownerId = localStorage.getItem('userId');
  //   if (!ownerId) {
  //     console.error("❌ Error: User ID not found in localStorage");
  //     return;
  //   }
  
  //   this.doorService.logAccess(doorId, ownerId, action).subscribe({
  //     next: (response) => console.log("✅ Access logged:", response),
  //     error: (err) => console.error("❌ Error logging access:", err),
  //   });
  // }

 /** ✅ Fetch owners of a specific door */
 getOwners(doorId: string) {
  this.doorService.getOwnersByDoorId(doorId).subscribe(
    (owners) => {
      console.log('Owners:', owners);
      const door = this.doors.find((d) => d._id === doorId);
      if (door) door.owners = owners;
    },
    (error) => console.error('Error fetching owners:', error)
  );
}

/** ✅ Add owner to a door */
addOwner(doorId: string) {
  if (!this.selectedUser) {
    alert('Please select a user');
    return;
  }

  this.doorService.addOwnerToDoor(doorId, this.selectedUser).subscribe(
    () => this.getOwners(doorId),
    (error) => console.error('Error adding owner:', error)
  );
}
readonly STREAM_URL = 'https://f0fa-102-152-221-52.ngrok-free.app:81/stream';
//
lockOpen(door: any) {
  this.doorService.unlockDoor(door.ip).subscribe(() => {
    alert(`🔓 Lock opened for ${door.doorName}`);
  });
}

lockClose(door: any) {
  this.doorService.lockDoor(door.ip).subscribe(() => {
    alert(`🔒 Lock closed for ${door.doorName}`);
  });
}
onCardClick(door: any) {
  console.log('Redirecting to camera stream...');
  window.location.href = this.STREAM_URL;
}
/** ✅ Remove owner from a door */
removeOwner(doorId: string, userId: string) {
  this.doorService.removeOwnerFromDoor(doorId, userId).subscribe({
    next: () => {
      console.log('✅ Owner removed successfully');
      this.getOwners(doorId); // Refresh owner list
    },
    error: (error) => {
      console.error('❌ Error removing owner:', error);
    }
  });
}
}