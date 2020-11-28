import { Component, Input, OnInit } from '@angular/core';
import {abilities, CharacterService} from '../../services/character.service';
import { MatDialog, MatDialogModule, MatDialogConfig } from '@angular/material/dialog';
import { AbilityDialogComponent } from '../ability-dialog/ability-dialog.component';

@Component({
  selector: 'app-abilities',
  templateUrl: './abilities.component.html',
  styleUrls: ['./abilities.component.scss']
})
export class AbilitiesComponent implements OnInit {

  abilityList: abilities[] = this.character.getAbilities();

  constructor(private character: CharacterService, private matDialog: MatDialog ) { }

  openDialog(abilityName: string, abilitySummary: string) {
    const dialogConfig = new MatDialogConfig()
    this.matDialog.open(AbilityDialogComponent, {

      width: '30vmax',
      data: {
        name: abilityName,
        summary: abilitySummary
      }

    });
    
  }
  ngOnInit(): void {
  }

}
