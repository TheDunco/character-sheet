import { Component, OnInit } from '@angular/core';
import { CharacterService} from '../../services/character.service';
import { MatDialog} from '@angular/material/dialog';
import { TrackablesDialogComponent } from '../trackables-dialog/trackables-dialog.component';


@Component({
  selector: 'app-trackables',
  templateUrl: './trackables.component.html',
  styleUrls: ['./trackables.component.scss']
})
export class TrackablesComponent implements OnInit {

  constructor(private character: CharacterService, private matDialog: MatDialog) { }

  tracklist = this.character.tracklist
  title: string;
  description: string;
  ngOnInit(): void {
  }

  openTrackDialog(trackTitle: string, trackDescription: string) {
    this.matDialog.open(TrackablesDialogComponent, {
      width: '60vmax',
      data: {
        title: trackTitle,
        description: trackDescription
      }
    });
  }
  
  openNewTrackDialog() {
     this.matDialog.open(TrackablesDialogComponent, {
       width: '60vmax',
       data: {
        title: "",
        description: ""
      }
     });
  }
}
