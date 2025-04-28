import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { filter } from 'rxjs/internal/operators/filter';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,SidebarComponent,CommonModule ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css' ,
  standalone: true,
 
})
export class AppComponent {
  isLoginPage = false;

  constructor(private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.isLoginPage = event.urlAfterRedirects.includes('/login');
      });
  }
  
}
