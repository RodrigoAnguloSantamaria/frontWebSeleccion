import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AppSettings } from 'appsettings-json-reader';
import { PlayerI } from '../interfaces/player';

@Injectable({
  providedIn: 'root',
})
export class PlayerServiceService {
  appSettings: any = AppSettings.readAppSettings();
  public playerData: PlayerI = {
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

  constructor(private http: HttpClient) {}

  public getPlayers() {
    return this.http.get(`${this.appSettings.DB_URL}/player`);
  }
  public getPlayerId(id: string) {
    return this.http.get(`${this.appSettings.DB_URL}/player/${id}`);
  }
  public getPlayerByTeam(team: string) {
    return this.http.get(`${this.appSettings.DB_URL}/player/team/${team}`);
  }

  public postPlayer(newPlayer: PlayerI) {
    return this.http.post(`${this.appSettings.DB_URL}/player`, newPlayer);
  }
  public modifyPlayer(player: PlayerI) {
    this.playerData = player;
  }
  public resetPlayerdata(player: PlayerI) {
    this.playerData = player;
  }
  public putPlayer(player: PlayerI) {
    return this.http.put(
      `${this.appSettings.DB_URL}/player/${this.playerData._id}`,
      player
    );
  }
  public deletePlayerServ(id: string) {
    console.log(`${this.appSettings.DB_URL}/player/${id}`);
    return this.http.delete(`${this.appSettings.DB_URL}/player/${id}`);
  }
}
