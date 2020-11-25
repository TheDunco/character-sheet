import { Component, Input, OnInit } from '@angular/core';
import {abilities, CharacterService} from '../../services/character.service';

@Component({
  selector: 'app-abilities',
  templateUrl: './abilities.component.html',
  styleUrls: ['./abilities.component.scss']
})
export class AbilitiesComponent implements OnInit {

  abilityList: abilities[] = this.character.getAbilities();
  name: string;
  summary: string;
  description: string;

  constructor(private character: CharacterService ) { }

  ngOnInit(): void {
  }

  openDialog(): void{
  
      const dialogRef = this.openDialog.open(DialogOverviewExampleDialog, {
        width: '250px',
        data: {noteTitle: this.noteTitle, description: this.description}

      });
      dialogRef.afterClosed.subscribe(result => {
        this.description.result;
      })

  }

}
