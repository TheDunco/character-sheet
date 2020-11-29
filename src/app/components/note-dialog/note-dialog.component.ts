import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CharacterService, note} from '../../services/character.service';


@Component({
  selector: 'app-note-dialog',
  templateUrl: './note-dialog.component.html',
  styleUrls: ['./note-dialog.component.scss']
})
export class NoteDialogComponent implements OnInit {

  constructor(
    private character: CharacterService,
    public noteDialog: MatDialogRef<NoteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  tempNote: note= {nTitle: "", nDescription: ""};

  ngOnInit(): void {
    console.log(this.data.title,this.data.description);
  }
  closeDialog(){
    this.noteDialog.close();
  }
  saveNote(newTitle: string, newDescription: string){
  
    this.tempNote = {nTitle: newTitle, nDescription: newDescription};
    this.character.updateNote(this.tempNote, this.data.title);
    console.log(this.character)
    this.noteDialog.close();
  }
}
