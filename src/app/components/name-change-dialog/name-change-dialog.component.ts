import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CharacterService } from 'src/app/services/character.service';

@Component({
  selector: 'app-name-change-dialog',
  templateUrl: './name-change-dialog.component.html',
  styleUrls: ['./name-change-dialog.component.scss']
})
export class NameChangeDialogComponent implements OnInit {
  constructor(private character: CharacterService,public dialog: MatDialogRef<NameChangeDialogComponent>) { }
  
  ngOnInit(): void { }
  
  newName: string
  
  changeName() {
    this.character.setName(this.newName)
    this.dialog.close()
  }
}
