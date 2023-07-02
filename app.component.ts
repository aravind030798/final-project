import { Component, inject, OnInit } from '@angular/core';
import { Player, PlayersService } from './players.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'team_management';

  constructor() {}
}
