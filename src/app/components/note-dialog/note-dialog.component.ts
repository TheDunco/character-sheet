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
    private userNote: CharacterService,
    public noteDialog: MatDialogRef<NoteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  tempNote: note= {nTitle: "", nDescription: ""};

  ngOnInit(): void {
  }
  closeDialog(){
    this.noteDialog.close();
  }
  saveNote(title: string, description: string){
    console.log(title,description);
    this.tempNote = {nTitle: title, nDescription: description};
    this.userNote.addNote(this.tempNote);
    this.noteDialog.close();
  }
}
