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
    description: this.data.description,
    damageType: this.data.damageType,
    toHit: this.data.toHit,
    abilityScore: this.data.abilityScore,
    hitMisc: this.data.hitMisc,
    damageMisc: this.data.damageMisc
  };



  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public actionDialog: MatDialogRef<ActionDialogComponent>,
    public character: CharacterService
  ) {}

  ngOnInit(): void {
    this.tempName = this.data.name;
    this.calcFulls()
  }

  closeDialog(){
    this.actionDialog.close();
  }
  
  calcFulls(): void {
    if (this.tempAction.abilityScore === "Charisma") {
      this.tempAction.fullDamage = String(this.tempAction.damage + '+' + this.character.toMod(this.character.abilityScores.charisma))
      this.tempAction.fullToHit = String(this.character.toMod(this.character.abilityScores.charisma) + +this.tempAction.hitMisc + +(this.character.isProficient(this.tempAction.name) ? +this.character.proficiencyBonus : 0))
    }
    else if (this.tempAction.abilityScore === "Constitution") {
      this.tempAction.fullDamage = String(this.tempAction.damage + '+' + this.character.toMod(this.character.abilityScores.constitution))
      this.tempAction.fullToHit = String(this.character.toMod(this.character.abilityScores.constitution) + +this.tempAction.hitMisc + +(this.character.isProficient(this.tempAction.name) ? +this.character.proficiencyBonus : 0))
    } 
    else if (this.tempAction.abilityScore === "Dexterity") {
      this.tempAction.fullDamage = String(this.tempAction.damage + '+' + this.character.toMod(this.character.abilityScores.dexterity))
      this.tempAction.fullToHit = String(this.character.toMod(this.character.abilityScores.dexterity) + +this.tempAction.hitMisc + +(this.character.isProficient(this.tempAction.name) ? +this.character.proficiencyBonus : 0))
    }
    else if (this.tempAction.abilityScore === "Intelligence") {
      this.tempAction.fullDamage = String(this.tempAction.damage + '+' + this.character.toMod(this.character.abilityScores.intelligence))
      this.tempAction.fullToHit = String(this.character.toMod(this.character.abilityScores.intelligence) + +this.tempAction.hitMisc+ +(this.character.isProficient(this.tempAction.name) ? +this.character.proficiencyBonus : 0))
    }
    else if (this.tempAction.abilityScore === "Strength") {
      this.tempAction.fullDamage = String(this.tempAction.damage + '+' + this.character.toMod(this.character.abilityScores.strength))
      this.tempAction.fullToHit = String(this.character.toMod(this.character.abilityScores.strength) + +this.tempAction.hitMisc + +(this.character.isProficient(this.tempAction.name) ? +this.character.proficiencyBonus : 0))
    }
    else if (this.tempAction.abilityScore === "Wisdom") {
      this.tempAction.fullDamage = String(this.tempAction.damage + '+' + this.character.toMod(this.character.abilityScores.wisdom))
      this.tempAction.fullToHit = String(this.character.toMod(this.character.abilityScores.wisdom) + +this.tempAction.hitMisc + +(this.character.isProficient(this.tempAction.name) ? +this.character.proficiencyBonus : 0))
    }
  }

  saveAction() {
    this.calcFulls()
    this.character.updateAction(this.tempAction, this.tempName);
    this.actionDialog.close();
  }

  deleteAction(){
    this.character.deleteAction(this.tempName);
    this.actionDialog.close();
  } 
}
