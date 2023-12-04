import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { PlayerI } from 'src/app/interfaces/player';
import { PlayerServiceService } from 'src/app/services/player.service.service';
import { DialogComponent } from '../../dialog/dialog.component';

@Component({
  selector: 'app-addplayer',
  templateUrl: './addplayer.component.html',
  styleUrls: ['./addplayer.component.scss'],
})
export class AddplayerComponent implements OnInit {
  newPlayer!: PlayerI;
  playerForm!: FormGroup;
  sizeImage: boolean = false;
  typeImage: boolean = false;
  invalidForm: boolean = false;
  submitted: boolean = false;
  previewSrc: any;
  _id: string;

  constructor(
    private fb: FormBuilder,
    private playerService: PlayerServiceService,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.newPlayer = this.playerService.playerData;
    this._id = this.playerService.playerData._id;
  }

  ngOnInit(): void {
    this.playerForm = this.fb.group({
      name: [
        this.newPlayer.name,
        [Validators.required, Validators.minLength(3)],
      ],
      lastname: [
        this.newPlayer.lastname,
        [Validators.required, Validators.minLength(3)],
      ],
      height: [
        this.newPlayer.height,
        [Validators.required, Validators.min(120), Validators.max(250)],
      ],
      alias: this.newPlayer.alias,
      dorsal: [this.newPlayer.dorsal, [Validators.min(0), Validators.max(99)]],
      age: [this.newPlayer.age, [Validators.min(18), Validators.max(80)]],
      team: [this.newPlayer.team, [Validators.minLength(3)]],
      position: [this.newPlayer.position, [Validators.required]],
      image: null,
    });

    this.playerForm.valueChanges.subscribe((change) => {
      this.newPlayer = {
        name: change.name,
        lastname: change.lastname,
        height: change.height,
        alias: change.alias,
        dorsal: change.dorsal,
        age: change.age,
        team: change.team,
        position: change.position,
        image: this.newPlayer.image,
      };
    });
  }
  handleInputFile(event: any) {
    this.typeImage = false;
    const file: File = event.target.files[0];
    this.previewSrc = URL.createObjectURL(file);

    const fileType: string = file.type.split('/')[0];
    //console.log(fileType);
    if (fileType !== 'image') {
      this.typeImage = true;
    }
    if (file.size < 2000000) {
      this.newPlayer.image = file;

      this.sizeImage = false;
    } else {
      this.sizeImage = true;
    }
  }

  defineType(player: PlayerI) {
    //console.log(player);
    if (player.image) {
      const formData: any = new FormData();

      Object.keys(this.newPlayer).forEach((key) => {
        //console.log(key, this.newPlayer[key]);
        formData.append(key, this.newPlayer[key]);
      });
      return formData;
    } else {
      return player;
    }
  }

  submitForm() {
    this.submitted = true;

    if (this.playerForm.valid && this.sizeImage === false) {
      const playerToSend: PlayerI = this.defineType(this.newPlayer);
      // console.log(playerToSend);
      if (this._id) {
        this.playerService.putPlayer(playerToSend).subscribe((data: any) => {
          this.dialog.open(DialogComponent, {
            width: '150px',
            data: { origen: 'put' },
          });
        });
      } else {
        this.playerService.postPlayer(playerToSend).subscribe((data: any) => {
          this.dialog.open(DialogComponent, {
            width: '150px',
            data: { origen: 'post' },
          });
        });
      }

      this.router.navigate(['dashboard']);
    } else {
      this.invalidForm = true;
      setTimeout(() => (this.invalidForm = false), 2500);
    }
  }
}
