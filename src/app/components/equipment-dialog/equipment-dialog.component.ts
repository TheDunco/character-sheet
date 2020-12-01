import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { EquipmentComponent } from '../equipment/equipment.component';

@Component({
  selector: 'app-equipment-dialog',
  templateUrl: './equipment-dialog.component.html',
  styleUrls: ['./equipment-dialog.component.scss']
})
export class EquipmentDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
  }

}
