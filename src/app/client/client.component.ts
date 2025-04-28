import { Component, OnInit } from '@angular/core';
import { DoorService } from '../services/door.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css'],
  imports: [CommonModule, FormsModule,],
})
export class ClientComponent implements OnInit {
  myDoors: any[] = [];

  constructor(private doorService: DoorService) {}

  ngOnInit() {
    this.loadDoors();
  }

  loadDoors() {
    this.doorService.getDoors().subscribe({
      next: (doors) => {
        this.myDoors = doors;
        console.log("✅ Doors loaded for client:", doors);
      },
      error: (err) => {
        console.error("❌ Error loading doors:", err);
      }
    });
  }

  onCardClick(door: any) {
    console.log("Door clicked:", door);
    // optional navigation or logic
  }

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

  toggleLED(state: 'on' | 'off') {
    // Call your LED toggle logic here (e.g., API or WebSocket)
    console.log("LED toggled:", state);
  }

  getDoorImage(status: string): string {
    return status === 'open'
      ? '/assets/images/green.jpg' 
    : '/assets/images/red.jpg';}
}
