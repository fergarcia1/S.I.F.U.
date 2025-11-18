import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-fixture-component',
  imports: [RouterLink],
  templateUrl: './fixture-component.html',
  styleUrl: './fixture-component.css',
})
export class FixtureComponent {
  private readonly route = inject(ActivatedRoute);
  // sacamos el ID del equipo de la url
  protected readonly teamId = Number(this.route.snapshot.paramMap.get('id'));
  private readonly location = inject(Location);

  goBack() {
    this.location.back();
  }
}
