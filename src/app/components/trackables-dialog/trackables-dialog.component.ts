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
  tempTrack: trackable = { name: "", description: "", max: 0, current: 0, type: this.data.type };

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
  
  max: number = this.data.max
  current = this.data.max
  selectedType: 'checkboxes' | 'number' = this.data.type
  
  saveTrack() {
    let current: number
    if (this.data.current > this.max) {
      current = this.max
    } else { current = this.data.current }
    
    console.log('Current: ', current)
    console.log('Max: ', this.max)
    this.tempTrack = { name: this.data.title, description: this.data.description, max: Number(this.max), current: current, type: this.selectedType };
    console.log('tempTrack', this.tempTrack)
    this.character.updateTrackable(this.tempTrack, this.tempName);
    console.log(this.character)
    this.trackDialog.close();
  }

  deleteTrack(){
    this.character.deleteTrack(this.data.title);
    this.trackDialog.close();
  } 

}
