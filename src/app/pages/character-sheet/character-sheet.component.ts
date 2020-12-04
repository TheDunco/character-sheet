import { Component } from '@angular/core';
import { CharacterService } from '../../services/character.service';

@Component({
  selector: 'app-character-sheet',
  templateUrl: './character-sheet.component.html',
  styleUrls: ['./character-sheet.component.scss']
})
export class CharacterSheetComponent {
  title = 'Character Sheet';

  
  constructor(public character: CharacterService){}


  newNoteEntered(){

  }
  
  
  ngOnInit() {
    this.character.levelSet()
  }
}

