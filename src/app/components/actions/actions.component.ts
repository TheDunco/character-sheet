import { MatDialog, MatDialogModule, MatDialogConfig } from '@angular/material/dialog';
import { Component, Input, OnInit } from '@angular/core';
import { action, CharacterService } from '../../services/character.service';
import { ActionDialogComponent } from '../action-dialog/action-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { Observable } from 'rxjs';
import { throwIfEmpty } from 'rxjs/operators';
import { AbilityScoreComponent } from '../ability-score/ability-score.component';


@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent implements OnInit {

  actionList: action[] = this.character.getActions();
  hasMelee: boolean;
  hasRange: boolean;
  hasMagic: boolean;
  hasPotion: boolean;
  hasSpecial: boolean;
  hasPower: boolean;
  hasSpell: boolean;
  test: Observable<any>;

  constructor(private character: CharacterService, private matDialog: MatDialog) {
    this.updateHeader()
  }

 
  
  
  openDialog(name: string, description: string, actionType: string, damage: string, damageType: string, toHit: number, abilityScore: string, hitMisc: number, damageMisc: number,fullToHit?:string, fullDamage?:string) {
    this.matDialog.open(ActionDialogComponent, {
      width: '60vmax',
      data: {
        name: name,
        damage: damage,
        actionType: actionType,
        description: description,
        damageType: damageType,
        toHit: toHit,
        abilityScore: abilityScore,
        hitMisc: hitMisc,
        damageMisc: damageMisc,
        fullToHit: fullToHit,
        fullDamage: fullDamage
      }
    });
  }

  openNewActionDialog() {
    this.matDialog.open(ActionDialogComponent, {
      width: '60vmax',
      data: {
        name: "",
        actionType: "",
        damage: "",
        description: "",
        abilityScore: "Strength"
      }
    });
  }

  updateHeader(){
    this.hasMelee = false;
    this.hasRange = false;
    this.hasMagic = false;
    this.hasPotion = false;
    this.hasSpecial = false;
    this.hasPower = false;
    this.hasSpell = false;
    for (let i = 0; i < this.actionList.length; i++) {
      switch (this.actionList[i].actionType) {
        case "Magic Item": {
          this.hasMagic = true;
          break;
        }
        case "Melee": {
          this.hasMelee = true;
          break;
        }
        case "Potion": {
          this.hasPotion = true;
          break;
        }
        case "Power": {
          this.hasPower = true;
          break;
        }
        case "Range": {
          this.hasRange = true;
          break;
        }
        case "Special": {
          this.hasSpecial = true;
          break;
        }
        case "Spell": {
          this.hasSpell = true;
          break;
        }
      }
    }
  }
  ngOnInit(): void {

  }
}
