import { Component, OnInit } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { PlayerServiceService } from 'src/app/services/player.service.service';
import { Router } from '@angular/router';
import { PlayerI } from 'src/app/interfaces/player';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(
    private service: PlayerServiceService,
    private router: Router,
    private teamsService: TeamService
  ) {}
  ngOnInit(): void {}

  resetPlayerData() {
    this.service.playerData = {
      _id: '',
      name: '',
      lastname: '',
      height: 0,
      alias: '',
      dorsal: 0,
      age: 0,
      team: '',
      position: '',
      image: null,
    };
    this.teamsService.teamData = {
      _id: '',
      name: '',
      championships: [],
      flag: null,
      ranking: 0,
    };
    this.router.navigate(['dashboard']);
  }
}
