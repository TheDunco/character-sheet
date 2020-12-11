import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { browser } from 'protractor';
import { timer } from 'rxjs';
import { character } from 'src/app/services/character-type';
import { CharacterService } from 'src/app/services/character.service';
import { user } from 'src/app/services/user-type';
import { setTimeout } from 'timers';
import { AuthService } from '../../services/auth/auth-service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    public auth: AuthService,
    public character: CharacterService,
    private router: Router
  ) { }
  userCharacters: character[]
  async ngOnInit() {
    this.userCharacters = await this.auth.getUserCharacterData()
  }
  
  // This needs to be called whenever the character sheet refreshes...
  goToCharacterSheet(character: character) {
    this.character.setCharacterValues(character)
    this.router.navigate(['character-sheet'])
  }
  
  async makeNewCharacter(): Promise<void> {
    await this.auth.makeNewUserCharacter();
    this.userCharacters = await this.auth.getUserCharacterData()
  }
  
  async deleteCharacter(character: character): Promise<void> {
    if (confirm("Are you sure to delete your character (irreversable)?")) {
      await this.auth.deleteUserCharacter(character);
      this.userCharacters = await this.auth.getUserCharacterData()
    }
  }
  

}
