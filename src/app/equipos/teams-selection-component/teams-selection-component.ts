import { Component, computed, inject, linkedSignal } from '@angular/core';
import { Teams } from '../../models/teams';
import { TeamsService } from '../teams-service';
import { ActivatedRoute, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-teams-selection-component',
  imports: [CommonModule],
  templateUrl: './teams-selection-component.html',
  styleUrl: './teams-selection-component.css',
})
export class TeamsSelectionComponent {

private readonly service = inject(TeamsService)
private readonly router = inject(Router)
private readonly route = inject(ActivatedRoute);
private readonly teamId = Number(this.route.snapshot.paramMap.get('id'));


protected readonly teamsSource = toSignal(this.service.getAllTeams())
protected readonly teams = linkedSignal(()=> this.teamsSource() ?? [])

protected readonly isLoading = computed(()=> this.teams() === undefined)

  navigateToPlantel(id: number){
    this.router.navigateByUrl(`/listaTeams/${id}`);
  }

  navigateToInicio(id: number){
    this.router.navigateByUrl(`/inicio/${id}`);
  }


}
