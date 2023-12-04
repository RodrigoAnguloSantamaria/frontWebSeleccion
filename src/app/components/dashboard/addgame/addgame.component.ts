import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { filter } from 'rxjs';
import { Game } from 'src/app/interfaces/game';
import { PlayerI } from 'src/app/interfaces/player';
import { TeamI } from 'src/app/interfaces/team';
import { GameService } from 'src/app/services/game.service';
import { PlayerServiceService } from 'src/app/services/player.service.service';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-addgame',
  templateUrl: './addgame.component.html',
  styleUrls: ['./addgame.component.scss'],
})
export class AddgameComponent implements OnInit {
  newGame: Game;
  gameForm: FormGroup;
  teams: TeamI[];
  teamPlayers?: PlayerI[];
  selectedTeam: string;
  submitted: boolean = false;
  invalidForm: boolean = false;
  errorHttp: boolean = false;

  constructor(
    private teamService: TeamService,
    private fb: FormBuilder,
    private gameService: GameService,
    private playerService: PlayerServiceService,
    private renderer: Renderer2
  ) {
    this.newGame = gameService.game;
  }

  ngOnInit(): void {
    this.teamService.getTeams().subscribe(
      (data: any) => {
        this.teams = data;
      },
      (data: any) => {
        //CONTROLA EL PARAMETRO ERROR DEL OBSERVABLE IGUALANDO TRUE VARIABLE Y ASI EN TEMPLATE PUEDE MOSTRAR AVISO
        this.errorHttp = true;
      }
    );
    this.gameForm = this.fb.group({
      teamA: [this.newGame.teamA, [Validators.required]],
      a_Starters: [this.newGame.a_Starters, [Validators.required]],
    });
    this.gameForm.valueChanges.subscribe((data: any) => {
      console.log(data);
    });
  }
  loadTeamPlayers() {
    this.selectedTeam = this.gameForm.get('teamA').value;

    this.playerService
      .getPlayerByTeam(this.selectedTeam)
      .subscribe((data: any) => {
        this.teamPlayers = data;
      });
  }
  handleStarters(data: HTMLElement) {
    console.log(this.gameForm.controls.a_Starters.value);
    if (this.gameForm.controls.a_Starters.value.length > 5) {
      //console.log(data);
      this.renderer.setProperty(data, 'selected', false);
      this.gameForm.controls.a_Starters.value.pop();
      this.invalidForm = true;
      setTimeout(() => (this.invalidForm = false), 2500);
      //console.log(this.gameForm.controls.a_Starters.value);
    }
  }

  submitForm() {
    event.preventDefault();
    this.submitted = true;
    console.log(this.gameForm.valid);
  }
}
