import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CharacterService, trackable} from '../../services/character.service';


@Component({
  selector: 'app-trackables-dialog',
  templateUrl: './trackables-dialog.component.html',
  styleUrls: ['./trackables-dialog.component.scss']
})
export class TrackablesDialogComponent implements OnInit {
  
  tempName:string;
  tempTrack: trackable = {name: "", description: "", max: 0, current: 0, type: 'checkboxes'};

  constructor(
    private character: CharacterService,
    public trackDialog: MatDialogRef<TrackablesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
    this.tempName = this.data.title;
  }

  closeDialog(){
    this.trackDialog.close();
  }

  saveTrack(){
    this.tempTrack = {name: this.data.title, description: this.data.description, max: this.tempTrack.max, current: this.tempTrack.current, type: this.tempTrack.type};
    this.character.updateTrackable(this.tempTrack, this.tempName);
    console.log(this.character)
    this.trackDialog.close();
  }

  deleteTrack(){
    this.character.deleteTrack(this.tempName);
    this.trackDialog.close();
  } 

}
