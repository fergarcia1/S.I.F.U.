import { Component, inject, signal } from '@angular/core';
import { SavesService } from './saves-service';
import { TeamsService } from '../equipos/teams-service';
import { AuthService } from '../auth/auth-service';
import { Router, RouterLink } from '@angular/router';
import { Saves } from '../models/saves';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-lista-partidas-guardadas',
  imports: [CommonModule, RouterLink, DatePipe],
  templateUrl: './lista-partidas-guardadas.html',
  styleUrl: './lista-partidas-guardadas.css',
})

export class ListaPartidasGuardadas {
private savesService = inject(SavesService);
  private teamsService = inject(TeamsService);
  private authService = inject(AuthService);
  private router = inject(Router);

  // Signals para el estado
  saves = signal<Saves[]>([]);
  isLoading = signal<boolean>(true);
  
  // Mapa para traducir ID -> Nombre de Equipo rápidamente
  // Ej: teamsMap.get(1) -> "Manchester City"
  teamsMap = signal<Map<number, string>>(new Map());

  constructor() {
    const userId = this.authService.getUser()?.id;

    if (!userId) {
      this.router.navigate(['/login']);
      return;
    }

    // 1. Cargamos los Equipos primero (para tener los nombres)
    this.teamsService.getAllTeams().subscribe(teams => {
      // Creamos el mapa de nombres
      const mapa = new Map<number, string>();
      teams.forEach(t => mapa.set(t.id, t.name));
      this.teamsMap.set(mapa);

      // 2. Ahora cargamos las partidas del usuario
      this.cargarPartidas(userId);
    });
  }

  private cargarPartidas(userId: number) {
    this.savesService.getSavesByUserId(userId).subscribe({
      next: (data) => {
        // Ordenamos para que la última modificada salga primero
        const ordenadas = data.sort((a, b) => 
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        );
        this.saves.set(ordenadas);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.isLoading.set(false);
      }
    });
  }

  // Helper para obtener el nombre en el HTML
  getTeamName(teamId: number): string {
    return this.teamsMap().get(teamId) || 'Equipo Desconocido';
  }
  
  // Helper para el logo
  getTeamLogo(teamId: number): string {
    return `/logos/${teamId}.png`; // Ajusta tu ruta de logos
  }

  continuarPartida(save: Saves) {
    this.router.navigate(['/inicio', save.teamId]);
  }
}
