import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { NameChangeDialogComponent } from 'src/app/components/name-change-dialog/name-change-dialog.component';
import { AuthService } from 'src/app/services/auth/auth-service';
import { character } from 'src/app/services/character-type';
import { user } from 'src/app/services/user-type';
import { CharacterService } from '../../services/character.service';

@Component({
  selector: 'app-character-sheet',
  templateUrl: './character-sheet.component.html',
  styleUrls: ['./character-sheet.component.scss']
})
export class CharacterSheetComponent implements OnInit, OnDestroy {

  title = 'Character Sheet';
  interval: any;
  
  constructor(
    public character: CharacterService,
    private auth: AuthService,
    private matDialog: MatDialog,
  ) { }
  
  ngOnInit() {
    this.character.levelSet()
    // Sync database with character every 10 seconds
    this.interval = setInterval(async () => {
      await this.auth.syncUserCharacter()
    }, 10000)
  }
  
  async syncData() {
    await this.auth.syncUserCharacter()
  }
  
  openNameDialog() {
    this.matDialog.open(NameChangeDialogComponent, {
      width: '15vmax'
    })
  }
  
  ngOnDestroy() {
  if (this.interval) {
    clearInterval(this.interval);
  }
}

}

