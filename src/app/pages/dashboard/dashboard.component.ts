import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { character } from 'src/app/services/character-type';
import { CharacterService } from 'src/app/services/character.service';
import { user } from 'src/app/services/user-type';
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
    // await this.auth.getUserCharacterData()
    this.userCharacters = this.character.userCharacters
  }
  
  goToCharacterSheet(character: character) {
    this.character.setCharacterValues(character)
    this.router.navigate(['character-sheet'])
  }

}
