import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DoorComponent } from './door/door.component';
import { ClientComponent } from './client/client.component';
import { LogsComponent } from './logs/logs.component';

export const routes: Routes = [ // ✅ Add 'export'
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'door', component: DoorComponent },
  { path: 'client', component: ClientComponent },
  { path: 'logs', component: LogsComponent },
];
