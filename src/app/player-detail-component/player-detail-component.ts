import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DataService } from '../services/data-service';
import { Player } from '../models/player';
import { Teams } from '../models/teams';


@Component({
  selector: 'app-player-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './player-detail-component.html',
  styleUrls: ['./player-detail-component.css']
})
export class PlayerDetailComponent implements OnInit {

  player: Player | undefined;
  team: Teams | undefined;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService
  ) {}

  ngOnInit(): void {

    const id = Number(this.route.snapshot.paramMap.get('id'));

    // 1) cargar jugador
    this.dataService.getPlayerById(id).subscribe(p => {
      this.player = p;

      if (p) {
        // 2) cargar su equipo
        this.dataService.getTeams().subscribe(teams => {
          this.team = teams.find(t => t.squad.some(s => s.id === p.id));
        });
      }
    });
  }
}