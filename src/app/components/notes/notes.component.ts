import { Component, OnInit } from '@angular/core';
import { Note, CharacterService } from '../../services/character.service';
import { NoteDialogComponent } from '../note-dialog/note-dialog.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {

  constructor(private character: CharacterService, private matDialog: MatDialog) { }
  
  ngOnInit(): void { }
  
  noteList: Note[] = this.character.getNotes();
  title:string;
  description:string;

  openNoteDialog(noteTitle:string, noteDescription:string){
    this.matDialog.open(NoteDialogComponent, {
      width: '60vmax',
      data: {
        title: noteTitle,
        description: noteDescription
      }
    });
  }
  
  openNewNoteDialog(){
    this.matDialog.open(NoteDialogComponent, {
      width: '60vmax',
      data: {
        title: "",
        description: ""
      } 
    });
  }
}
