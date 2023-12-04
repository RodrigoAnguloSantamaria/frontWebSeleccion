import { Injectable } from '@angular/core';
import { TeamI } from '../interfaces/team';
import { HttpClient } from '@angular/common/http';
import { AppSettings } from 'appsettings-json-reader';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  appSettings: any = AppSettings.readAppSettings();
  public teamData: TeamI = {
    _id: '',
    name: '',
    championships: [],
    flag: null,
    ranking: 0,
  };

  constructor(private http: HttpClient) {}

  public getTeams() {
    return this.http.get(`${this.appSettings.DB_URL}/team`);
  }
  public getTeamId(id: string) {
    return this.http.get(`${this.appSettings.DB_URL}/team/${id}`);
  }

  public postTeam(newTeam: TeamI) {
    return this.http.post(`${this.appSettings.DB_URL}/team`, newTeam);
  }
  public modifyTeam(team: TeamI) {
    this.teamData = team;
  }
  public resetTeamdata(team: TeamI) {
    this.teamData = team;
  }
  public putTeam(team: TeamI) {
    return this.http.put(
      `${this.appSettings.DB_URL}/team/${this.teamData._id}`,
      team
    );
  }
  public deleteTeamServ(id: string) {
    return this.http.delete(`${this.appSettings.DB_URL}/team/${id}`);
  }
}
