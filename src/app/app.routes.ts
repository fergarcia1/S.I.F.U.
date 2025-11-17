import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './guards/auth-guard';
import { RegisterComponent } from './auth/register/register.component';


export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./auth/login/login.component').then(m => m.LoginComponent)
  },
   { path: 'register', component: RegisterComponent },
  {
    path: 'menu',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./menu-principal/menu-principal.component').then(m => m.MenuComponent)
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];