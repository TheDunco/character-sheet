import { Component, OnInit } from '@angular/core';
import {note, CharacterService} from '../../services/character.service';
import { NoteDialogComponent } from '../note-dialog/note-dialog.component';
import { MatDialog} from '@angular/material/dialog';


@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {

  constructor(private character: CharacterService, private matDialog: MatDialog) { }

  noteList: note[] = this.character.getNotes();
  title:string;
  description:string;
  ngOnInit(): void {
  }

  openNoteDialog(noteTitle:string, noteDescription:string){
    const noteDialog = this.matDialog.open(NoteDialogComponent, {
      width: '30vmax',
      data: {
        title: noteTitle,
        description: noteDescription
      }
    });

  }
  openNewNoteDialog(){
     const noteNewDialog = this.matDialog.open(NoteDialogComponent, {
       width: '30vmax',
       data: {
        title: "",
        description: ""
      }
     });
  }

}
