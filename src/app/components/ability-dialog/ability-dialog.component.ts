import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { abilities } from '../../services/character.service';
import {AbilitiesComponent} from '../abilities/abilities.component';

@Component({
  selector: 'app-ability-dialog',
  templateUrl: './ability-dialog.component.html',
  styleUrls: ['./ability-dialog.component.scss']
})
export class AbilityDialogComponent implements OnInit {
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  ngOnInit(): void {
    
  }

}
