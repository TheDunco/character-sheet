import { Component, Input, OnInit } from '@angular/core';
import {Ability, CharacterService} from '../../services/character.service';
import { MatDialog, MatDialogModule, MatDialogConfig } from '@angular/material/dialog';
import { AbilityDialogComponent } from '../ability-dialog/ability-dialog.component';


@Component({
  selector: 'app-abilities',
  templateUrl: './abilities.component.html',
  styleUrls: ['./abilities.component.scss']
})

export class AbilitiesComponent implements OnInit {

  abilityList: Ability[] = this.character.getAbilities();

  constructor(private character: CharacterService, private matDialog: MatDialog ) { 
  }

  openDialog(name: string, summary: string, description: string) {
    const dialogConfig = new MatDialogConfig()
    this.matDialog.open(AbilityDialogComponent, {
      width: '60vmax',
      data: {
        name: name,
        summary: summary,
        description: description
      }

    });
  }

  openNewAbilityDialog(){
    this.matDialog.open(AbilityDialogComponent, {
      width: '60vmax',
      data: {
       name: "",
       summary: "",
       description: "",
     }
    });
 }
  ngOnInit(): void {
  }

}
