import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
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
    private db: AngularFirestore
  ) { }
  userCharacters: character[]
  async ngOnInit(): Promise<void> {
    await this.auth.user$.subscribe(user => {
      this.db.doc<user>(`users/${user.uid}`).valueChanges().subscribe(
        ref => this.userCharacters = ref.characters)
    })
  }

}
