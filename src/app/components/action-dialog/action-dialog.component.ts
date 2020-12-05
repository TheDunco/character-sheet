import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA,MatDialogRef} from '@angular/material/dialog';
import { action, CharacterService } from '../../services/character.service';

@Component({
  selector: 'app-action-dialog',
  templateUrl: './action-dialog.component.html',
  styleUrls: ['./action-dialog.component.scss']
})
export class ActionDialogComponent implements OnInit {

  tempName:string;
  tempAction: action = {
        name: this.data.name,
        damage: this.data.damage,
        actionType: this.data.actionType,
        description: this.data.description
  };



  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public actionDialog: MatDialogRef<ActionDialogComponent>,
    private character: CharacterService
  ) {}

  ngOnInit(): void {
    this.tempName=this.data.name;
    console.log(this.data.description);
  }

  closeDialog(){
    this.actionDialog.close();
  }

  saveAction(){
    this.character.updateAction(this.tempAction, this.tempName);
    this.actionDialog.close();
  }

  deleteAction(){
    this.character.deleteAction(this.tempName);
    this.actionDialog.close();
  } 
}
