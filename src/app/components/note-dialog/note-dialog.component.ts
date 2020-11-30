import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CharacterService, note} from '../../services/character.service';


@Component({
  selector: 'app-note-dialog',
  templateUrl: './note-dialog.component.html',
  styleUrls: ['./note-dialog.component.scss']
})
export class NoteDialogComponent implements OnInit {
  
  tempTitle:string;
  tempNote: note= {nTitle: "", nDescription: ""};

  constructor(
    private character: CharacterService,
    public noteDialog: MatDialogRef<NoteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
    this.tempTitle = this.data.title;
  }

  closeDialog(){
    this.noteDialog.close();
  }

  saveNote(){
    if(this.data.title && this.data.description){
      this.tempNote = {nTitle: this.data.title, nDescription: this.data.description};
      this.character.updateNote(this.tempNote, this.tempTitle);
      console.log(this.character)
      this.noteDialog.close();
    }
    else {
      alert("Please fill out both to create a note.");
    }
  }

  deleteNote(){
    this.character.deleteNote(this.tempTitle);
    this.noteDialog.close();
  } 

  cloneNote(){
    this.character.cloneNote(this.tempTitle);
  }
}
