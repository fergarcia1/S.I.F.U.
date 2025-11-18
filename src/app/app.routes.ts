import { Routes } from '@angular/router';
import { TeamsSelectionComponent } from './equipos/teams-selection-component/teams-selection-component';
import { PlantelComponent } from './equipos/plantel-component/plantel-component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './guards/auth-guard';
import { RegisterComponent } from './auth/register/register.component';
import { MenuComponent } from './menu-principal/menu-principal.component';


export const routes: Routes = [
  {
    path: 'listaTeams',
    canActivate: [AuthGuard],
    component: TeamsSelectionComponent
  },
  {
    path: 'listaTeams/:id',
    canActivate: [AuthGuard],
    component: PlantelComponent
  },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'menu',
    canActivate: [AuthGuard],
    component: MenuComponent
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];