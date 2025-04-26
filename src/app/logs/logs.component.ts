import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { environment } from '../../environments/environment';
const API_URL = environment.apiUrl;
export interface Log {
  user: {
    name: string;
    email: string;
  };
  doorId: {
    name: string;
  };
  action: string;
  timestamp: string;
}

@Component({
  standalone: true,
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css'],
    imports: [CommonModule],providers: [LogsComponent],
})
export class LogsComponent implements OnInit {
  logs: Log[] = [];
  API_URL: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchLogs();
  }

  fetchLogs(): void {
    this.http.get<Log[]>( `${this.API_URL}/logs`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }).subscribe({
      next: data => {
        this.logs = data;
      },
      error: err => {
        console.error("Failed to load logs", err);
      }
    });
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleString();
  }
}
