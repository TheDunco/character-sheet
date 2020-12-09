import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth-service';
import { CharacterService } from '../../services/character.service';

@Component({
  selector: 'app-character-sheet',
  templateUrl: './character-sheet.component.html',
  styleUrls: ['./character-sheet.component.scss']
})
export class CharacterSheetComponent {
  title = 'Character Sheet';

  
  constructor(public character: CharacterService, private auth: AuthService){}

  syncData() {
    this.auth.syncUserCharacter(this.character.getFullCharacter())
  }
  
  ngOnInit() {
    this.character.levelSet()
  }
}

