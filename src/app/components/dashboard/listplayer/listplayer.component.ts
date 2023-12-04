import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PlayerI } from 'src/app/interfaces/player';
import { PlayerServiceService } from 'src/app/services/player.service.service';
import { DialogComponent } from '../../dialog/dialog.component';

@Component({
  selector: 'app-listplayer',
  templateUrl: './listplayer.component.html',
  styleUrls: ['./listplayer.component.scss'],
})
export class ListplayerComponent implements OnInit {
  @ViewChild('name') inputname: any;
  @ViewChild('team') selectteam: any;
  @ViewChild('position') selectposition: any;
  @ViewChild('height') inputheight: any;
  allPlayers: PlayerI[];
  isLoad: boolean = false;
  filteredPlayers: PlayerI[];
  inputValue: string = '';
  teamSelected: string;
  positionSelected: string;
  heightSelected: number = 250;
  constructor(
    private service: PlayerServiceService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.service.getPlayers().subscribe((data: any) => {
      this.allPlayers = data;
      this.isLoad = true;
      this.filteredPlayers = [...this.allPlayers];
    });
  }
  editPlayer(player: PlayerI) {
    this.service.modifyPlayer(player);
    this.router.navigate(['/dashboard/addplayer']);
  }
  deletePlayer(player: PlayerI) {
    let { _id } = player;

    this.service.deletePlayerServ(_id).subscribe((data: any) => {
      this.dialog.open(DialogComponent, {
        width: '150px',
        data: { origen: 'delete' },
      });
    });

    this.router.navigate(['/dashboard']);
  }
  nameFilter(event: any) {
    this.inputValue = event.target.value;
    this.filters();
  }
  teamFilter(event: any) {
    this.teamSelected = event.target.value;
    this.filters();
  }
  positionFilter(event: any) {
    this.positionSelected = event.target.value;
    this.filters();
  }
  heightFilter(event: any) {
    this.heightSelected = event.target.value;
    this.filters();
  }

  filters() {
    this.filteredPlayers = this.allPlayers.filter((player) => {
      return (
        player.name.toLowerCase().includes(this.inputValue.toLowerCase()) ||
        player.lastname.toLowerCase().includes(this.inputValue.toLowerCase())
      );
    });
    if (this.teamSelected) {
      this.filteredPlayers = this.filteredPlayers.filter((player) => {
        return player.team.toLowerCase() === this.teamSelected.toLowerCase();
      });
    }
    if (this.positionSelected) {
      this.filteredPlayers = this.filteredPlayers.filter((player) => {
        return (
          player.position.toLowerCase() === this.positionSelected.toLowerCase()
        );
      });
    }
    if (this.heightSelected !== 250) {
      this.filteredPlayers = this.filteredPlayers.filter((player) => {
        return player.height <= this.heightSelected;
      });
    }
  }
  resetFilters() {
    this.inputValue = '';
    this.heightSelected = 250;
    this.teamSelected = '';
    this.positionSelected = '';
    this.inputname.nativeElement.value = '';
    this.selectteam.nativeElement.value = '';
    this.selectposition.nativeElement.value = '';
    this.inputheight.nativeElement.value = 250;
    this.heightSelected = 250;
    this.filteredPlayers = this.allPlayers;
    console.log(
      this.inputname,
      this.inputheight,
      this.selectteam,
      this.selectposition
    );
  }
}
