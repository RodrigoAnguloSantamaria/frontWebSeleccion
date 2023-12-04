import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TeamI, ChampI } from 'src/app/interfaces/team';
import { TeamService } from 'src/app/services/team.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../dialog/dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addteam',
  templateUrl: './addteam.component.html',
  styleUrls: ['./addteam.component.scss'],
})
export class AddteamComponent implements OnInit {
  team: TeamI = this.service.teamData;
  submitted: boolean = false;
  typeImage: boolean = false;
  previewSrc: any;
  sizeImage: boolean = false;
  invalidForm: boolean = false;

  _id: string;

  teamForm = this.fb.group({
    name: [this.team.name, [Validators.required, Validators.minLength(3)]],
    championships: this.fb.array(
      this.team.championships.map((championship: ChampI) =>
        this.fb.group({
          tournament: [championship.tournament, [Validators.required]],
          position: [
            championship.position,
            [Validators.required, Validators.min(0)],
          ],
          year: [
            championship.year,
            [Validators.min(1900), Validators.max(2023), Validators.required],
          ],
        })
      )
    ),

    flag: null,
    ranking: [
      this.team.ranking,
      [Validators.required, Validators.min(0), Validators.max(150)],
    ],
  });

  get championships() {
    return this.teamForm.get('championships') as FormArray;
  }

  constructor(
    private fb: FormBuilder,
    private service: TeamService,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.team = this.service.teamData;
    this._id = this.service.teamData._id;
  }

  ngOnInit(): void {
    this.teamForm.valueChanges.subscribe((changes: TeamI) => {
      this.team = {
        name: changes.name,
        ranking: changes.ranking,
        championships: changes.championships,
        flag: this.team.flag,
      };
      console.log(this.team);
    });
  }

  addChampionships() {
    this.submitted = false;
    const newChampionship = this.fb.group({
      tournament: ['', [Validators.required]],
      position: [0, [Validators.required, Validators.min(0)]],
      year: [0, [Validators.min(1900), Validators.max(2023)]],
    });
    this.championships.push(newChampionship);
  }

  handleInputFile(event: any) {
    this.typeImage = false;
    const file: File = event.target.files[0];
    this.previewSrc = URL.createObjectURL(file);

    const fileType: string = file.type.split('/')[0];
    console.log(fileType);
    if (fileType !== 'image') {
      this.typeImage = true;
    }
    if (file.size < 2000000) {
      this.team.flag = file;

      this.sizeImage = false;
    } else {
      this.sizeImage = true;
    }
  }

  defineType(team: TeamI) {
    //console.log(player);
    if (team.flag) {
      const formData: any = new FormData();

      Object.keys(this.team).forEach((key) => {
        //console.log(key, this.team[key]);
        if (key === 'championships') {
          formData.append(key, JSON.stringify(this.team[key]));
        } else {
          formData.append(key, this.team[key]);
        }
      });
      return formData;
    } else {
      return team;
    }
  }
  submitForm() {
    this.submitted = true;

    if (this.teamForm.valid && this.sizeImage === false) {
      const teamToSend: TeamI = this.defineType(this.team);
      console.log(teamToSend);
      if (this._id) {
        this.service.putTeam(teamToSend).subscribe((data: any) => {
          this.dialog.open(DialogComponent, {
            width: '150px',
            data: { origen: 'put' },
          });
        });
      } else {
        this.service.postTeam(teamToSend).subscribe((data: any) => {
          this.dialog.open(DialogComponent, {
            width: '150px',
            data: { origen: 'post' },
          });
        });
      }
      this.router.navigate(['dashboard']);
    } else {
      this.invalidForm = true;
      console.log('invalid form');
      setTimeout(() => (this.invalidForm = false), 2500);
    }
  }
}
