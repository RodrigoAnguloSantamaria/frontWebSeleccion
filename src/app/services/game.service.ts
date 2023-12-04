import { Injectable } from '@angular/core';
import { Game } from '../interfaces/game';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  game: Game = {
    id: '',
    teamA: '',
    a_Starters: [],
  };
  constructor() {}
}
