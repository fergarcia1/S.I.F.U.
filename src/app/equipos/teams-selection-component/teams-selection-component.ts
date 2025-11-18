import { Component, computed, inject, linkedSignal, signal } from '@angular/core';
import { Teams } from '../../models/teams';
import { TeamsService } from '../teams-service';
import { ActivatedRoute, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-teams-selection-component',
  imports: [CommonModule,FormsModule],
  templateUrl: './teams-selection-component.html',
  styleUrl: './teams-selection-component.css',
})
export class TeamsSelectionComponent {
///servicios
private readonly service = inject(TeamsService)
private readonly router = inject(Router)
private readonly route = inject(ActivatedRoute);
private readonly teamId = Number(this.route.snapshot.paramMap.get('id'));
//obtencion de datos 
protected readonly teamsSource = toSignal(this.service.getAllTeams())
protected readonly teams = linkedSignal(()=> this.teamsSource() ?? [])
///validaciones
protected readonly isLoading = computed(()=> this.teams() === undefined)
//filtrado
protected searchTerm = signal<string>('');

protected readonly filteredTeams = computed(() => {
    const teams = this.teamsSource() ?? [];
    const term = this.searchTerm().toLowerCase();
    if (!term) return teams; // si no escribio nada, devuelve todo
    return teams.filter(team =>  //filtra por nombre completo o abreviatura 
      team.name.toLowerCase().includes(term) || 
      team.shortName.toLowerCase().includes(term)
    );
  });

  navigateToPlantel(id: number){
    this.router.navigateByUrl(`/listaTeams/${id}`);
  }

  navigateToInicio(id: number){
    this.router.navigateByUrl(`/inicio/${id}`);
  }


}
