import { Component, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Character Sheet';

  userNotes: Item[];
  noteTitle:string;
  description:string;
  
  constructor(public dialog: MatDialog){}

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: {noteTitle: this.noteTitle, description: this.description}
    });
  }

  newNoteEntered(){

  }
}

interface Item {
  noteTitle: string,
  description:string
}


@Component({
  selector: 'note-dialog',
  templateUrl: './components/dialogs/note-dialog.html',
})
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Item) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}