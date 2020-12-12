import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CharacterService, Trackable } from '../../services/character.service';


@Component({
  selector: 'app-trackables-dialog',
  templateUrl: './trackables-dialog.component.html',
  styleUrls: ['./trackables-dialog.component.scss']
})
export class TrackablesDialogComponent implements OnInit {
  constructor(
    private character: CharacterService,
    public trackDialog: MatDialogRef<TrackablesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) { }
    
  ngOnInit(): void {
    this.tempName = this.data.title;
  }
    
  tempName:string;
  tempTrack: Trackable = { name: "", description: "", max: 0, current: 0, type: this.data.type };
  max: number = this.data.max
  current = this.data.max
  selectedType: 'checkboxes' | 'number' = this.data.type
  
  closeDialog(){
    this.trackDialog.close();
  }
  
  saveTrack() {
    let current: number
    if (this.data.current > this.max) {
      current = this.max
    } else { current = this.data.current }
    this.tempTrack = { name: this.data.title, description: this.data.description, max: Number(this.max), current: current, type: this.selectedType };
    if (this.tempTrack.name == "") { alert('Please provide a trackable name') }
    else {
      this.character.updateTrackable(this.tempTrack, this.tempName);
      this.trackDialog.close();
    }
  }

  deleteTrack(){
    this.character.deleteTrack(this.data.title);
    this.trackDialog.close();
  } 

  cloneTrack() {
    this.character.cloneTrack(this.tempName)
  }
}
