import { Component, OnInit } from '@angular/core';
import { TeamI } from 'src/app/interfaces/team';
import { TeamService } from 'src/app/services/team.service';
import { DialogComponent } from '../../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listteam',
  templateUrl: './listteam.component.html',
  styleUrls: ['./listteam.component.scss'],
})
export class ListteamComponent implements OnInit {
  isLoad: boolean = false;
  allTeams: TeamI[];
  filteredTeams: TeamI[];
  inputValue: string = '';

  constructor(
    private service: TeamService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.service.getTeams().subscribe((data: any) => {
      this.allTeams = data;
      this.isLoad = true;
      this.filteredTeams = [...this.allTeams];
    });
  }
  nameFilter(event: any) {
    this.inputValue = event.target.value;
    this.filters();
  }

  filters() {
    this.filteredTeams = this.allTeams.filter((team) => {
      return team.name.toLowerCase().includes(this.inputValue.toLowerCase());
    });
  }

  editTeam(team: TeamI) {
    this.service.getTeamId(team._id).subscribe((data: any) => {
      this.service.teamData = data;
      this.router.navigate(['dashboard/addteam']);
    });
  }
  deleteTeam(team: TeamI) {
    let { _id } = team;
    this.service.deleteTeamServ(_id).subscribe((data: any) => {
      this.dialog.open(DialogComponent, {
        width: '150px',
        data: { origen: 'delete' },
      });
    });
    this.router.navigate(['/dashboard']);
  }
}
