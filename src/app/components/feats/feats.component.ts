import { Component, OnInit } from '@angular/core';
import {feat, CharacterService} from '../../services/character.service';
import { FeatDialogComponent } from '../feat-dialog/feat-dialog.component';
import { MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-feats',
  templateUrl: './feats.component.html',
  styleUrls: ['./feats.component.scss']
})
export class FeatsComponent implements OnInit {

  constructor(private character: CharacterService, private matDialog: MatDialog) { }

  featList: feat[] = this.character.getFeat();
  title:string;
  description:string;
  detail:string;
  summary:string;

  ngOnInit(): void {
  }

  openFeatDialog(featTitle:string, featDescription:string, featDetail:string, featSummary:string){
    this.matDialog.open(FeatDialogComponent, {
      width: '60vmax',
      data: {
        title: featTitle,
        description: featDescription,
        detail: featDetail,
        summary: featSummary
      }
    });

  }
  openNewFeatDialog(){
    this.matDialog.open(FeatDialogComponent, {
       width: '60vmax',
       data: {
        title: "",
        description: "",
        detail: "",
        summary: ""
      }
     });
  }


}
