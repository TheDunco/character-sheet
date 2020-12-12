import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Ability, CharacterService } from '../../services/character.service';

@Component({
  selector: 'app-ability-dialog',
  templateUrl: './ability-dialog.component.html',
  styleUrls: ['./ability-dialog.component.scss']
})
export class AbilityDialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public abilityDialog: MatDialogRef<AbilityDialogComponent>,
    private character: CharacterService
  ) {}

  ngOnInit(): void {
    this.tempName=this.data.name;
    console.log(this.data.description);
  }
  
  tempName:string;
  tempAbility: Ability = {
    name: this.data.name,
    summary: this.data.summary,
    description: this.data.description
  };

  closeDialog(){
    this.abilityDialog.close();
  }

  saveAbility(){
    this.character.updateAbility(this.tempAbility, this.tempName);
    this.abilityDialog.close();
  }

  deleteAbility(){
    this.character.deleteAbility(this.tempName);
    this.abilityDialog.close();
  } 

}
