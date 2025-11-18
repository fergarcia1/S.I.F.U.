import { Routes } from '@angular/router';

// 1. Componentes de Equipos
import { TeamListComponent } from './team-list-component/team-list-component';
import { TeamFormComponent } from './team-form-component/team-form-component';

// 2. Componentes de Jugadores
import { PlayerListComponent } from './player-list-component/player-list-component';
import { PlayerFormComponent } from './player-form-component/player-form-component';

import { PlayerDetailComponent } from './player-detail-component/player-detail-component';



export const routes: Routes = [
  // ... rutas de equipos existentes ...
  { path: 'teams', component: TeamListComponent },
  { path: 'teams/create', component: TeamFormComponent },
  { path: 'teams/edit/:id', component: TeamFormComponent },
  { path: '', redirectTo: 'teams', pathMatch: 'full' },
  // NUEVAS RUTAS DE JUGADORES:
  
  // 1. Ruta para ver la plantilla (PlayerListComponent)
  { path: 'teams/:teamId/players', component: PlayerListComponent }, 
  
  // 2. Ruta para crear un nuevo jugador (PlayerFormComponent - Alta)
  { path: 'teams/:teamId/players/create', component: PlayerFormComponent },

  // 3. Ruta para editar un jugador existente (PlayerFormComponent - Modificación)
  { path: 'teams/:teamId/players/edit/:playerId', component: PlayerFormComponent },

  // 4. Ruta para obtener un jugador por id
  { path: 'player/:id', component: PlayerDetailComponent }

  // ... rutas por defecto
];
