import { Component, inject } from '@angular/core';
import { Location } from '@angular/common';
import { TeamsService } from '../../equipos/teams-service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../auth/auth-service';
import { GameStateService } from '../game-state-service';


@Component({
  selector: 'app-inicio-component',
  imports: [RouterLink],
  templateUrl: './inicio-component.html',
  styleUrl: './inicio-component.css',
})
export class InicioComponent {

  private readonly service = inject(TeamsService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly auth = inject(AuthService);
  private readonly location = inject(Location);

  private readonly gameState = inject(GameStateService);

  protected readonly teamId = Number(this.route.snapshot.paramMap.get('id'));

  constructor() {
  
  }


  navigateToMenuSimulacion(id: number) {
    this.router.navigateByUrl(`/menuSimulacion/${id}`);
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
