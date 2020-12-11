import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CharacterService,Feat} from '../../services/character.service';


@Component({
  selector: 'app-feat-dialog',
  templateUrl: './feat-dialog.component.html',
  styleUrls: ['./feat-dialog.component.scss']
})

export class FeatDialogComponent implements OnInit {

  tempTitle:string;
  tempFeat: Feat= {fTitle: "", fDescription: "", fSummary: "", fDetail:""};

  constructor(
    private character: CharacterService,
    public featDialog: MatDialogRef<FeatDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.tempTitle = this.data.title;
  }

  closeDialog(){
    this.featDialog.close();
  }
  
  saveFeat(){
    this.tempFeat = {fTitle: this.data.title, fDescription: this.data.description, fSummary: this.data.summary, fDetail: this.data.detail};
    this.character.updateFeat(this.tempFeat, this.tempTitle);
    this.featDialog.close();
  }

  deleteFeat(){
    this.character.deleteFeat(this.tempTitle);
    this.featDialog.close();
  }

  cloneFeat(){
    this.character.cloneFeat(this.tempTitle);
  }

}
