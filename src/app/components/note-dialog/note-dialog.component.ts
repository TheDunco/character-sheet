import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CharacterService, Note } from '../../services/character.service';


@Component({
  selector: 'app-note-dialog',
  templateUrl: './note-dialog.component.html',
  styleUrls: ['./note-dialog.component.scss']
})
export class NoteDialogComponent implements OnInit {
  
  tempTitle:string;
  tempDescription:string;
  tempNote: Note= {nTitle: "", nDescription: ""};

  constructor(
    private character: CharacterService,
    public noteDialog: MatDialogRef<NoteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
    this.tempTitle = this.data.title;
    this.tempDescription = this.data.description;
  }

  closeDialog(){
    this.noteDialog.close();
  }

  saveNote(){
    this.tempNote = {nTitle: this.data.title, nDescription: this.data.description};
    this.character.updateNote(this.tempNote, this.tempTitle, this.tempDescription);
    console.log(this.character)
    this.noteDialog.close();
  }

  deleteNote(){
    this.character.deleteNote(this.tempTitle, this.tempDescription);
    this.noteDialog.close();
  } 

  cloneNote(){
    this.character.cloneNote(this.tempTitle);
  }
}
