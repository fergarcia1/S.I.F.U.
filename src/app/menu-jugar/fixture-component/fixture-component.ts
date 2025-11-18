import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameStateService } from '../../menu-jugar/game-state-service';
import { Teams } from '../../models/teams';
import { Match } from '../../models/match';

@Component({
  selector: 'app-fixture',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './fixture-component.html',
  styleUrl: './fixture-component.css',
})
export class FixtureComponent {

  private readonly gameState = inject(GameStateService);

  // 🔹 Acceso directo al fixture
  protected readonly fixture = computed(() => this.gameState.getState()?.fixture ?? []);

  // 🔹 Equipos (para mostrar nombres y escudos)
  protected readonly teams = computed(() => this.gameState.getState()?.teams ?? []);

  // 🔹 Agrupamos partidos por fecha (matchday)
  protected readonly fixtureByMatchday = computed(() => {
    const matches = this.fixture();
    const map = new Map<number, Match[]>();

    matches.forEach(m => {
      if (!map.has(m.matchday)) {
        map.set(m.matchday, []);
      }
      map.get(m.matchday)!.push(m);
    });

    // ordenar por fecha
    return Array.from(map.entries())
      .sort((a, b) => a[0] - b[0])
      .map(([matchday, games]) => ({
        matchday,
        games
      }));
  });

  // 🔹 Helper para obtener nombres de equipos
  getTeamName(id: number): string {
    return this.teams().find(t => t.id == id)?.name ?? '???';
  }

}
