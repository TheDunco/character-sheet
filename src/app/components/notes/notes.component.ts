import { Component, OnInit } from '@angular/core';
import { note, CharacterService } from '../../services/character.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {

  noteTitle: string;
  description: string;

  constructor(public dialog: MatDialog) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: { noteTitle: this.noteTitle, description: this.description }
    });
  }
}

@Component({
  selector: '../note-dialog',
  templateUrl: './components/dialogs/note-dialog.html',
})
export class DialogOverviewExampleDialog {

  userNotes: note[];

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: note
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  newNoteEntered() {
    this.userNotes.push({ title: this.data.noteTitle, description: this.data.description })
  }
}
