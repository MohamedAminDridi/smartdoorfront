import { Component, OnInit } from '@angular/core';
import { DoorService } from '../services/door.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
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
    const newStatus = door.status === 'open' ? 'closed' : 'open';
    this.doorService.updateDoorStatus(door._id, newStatus).subscribe(() => {
      door.status = newStatus;
    });
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
