import { Component, OnInit } from '@angular/core';
import { CharacterService, trackable} from '../../services/character.service';
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
  
  makeArray(n: number): number[] {
    return [...Array(n).keys()];
  }
  
  addCurrent(track: trackable): void {
    if (track.current + 1 <= track.max) {
      track.current += 1
    }
  }
  
  subtractCurrent(track: trackable): void {
    if (track.current - 1 >= 0) {
      track.current -= 1
    }
  }

  openTrackDialog(trackTitle: string, trackDescription: string, trackType: 'number' | 'checkboxes', trackMax: number, trackCurrent: string) {
    this.matDialog.open(TrackablesDialogComponent, {
      width: '60vmax',
      data: {
        title: trackTitle,
        description: trackDescription,
        type: trackType,
        max: trackMax,
        current: trackCurrent,
      }
    });
  }
  
  openNewTrackDialog() {
     this.matDialog.open(TrackablesDialogComponent, {
       width: '60vmax',
       data: {
        title: "",
        description: "",
        type: 'checkboxes',
        max: 0,
        current: 0,
      }
     });
  }
}
