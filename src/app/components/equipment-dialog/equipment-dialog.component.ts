import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { CharacterService, Equipment } from 'src/app/services/character.service';
import { EquipmentComponent } from '../equipment/equipment.component';


@Component({
  selector: 'app-equipment-dialog',
  templateUrl: './equipment-dialog.component.html',
  styleUrls: ['./equipment-dialog.component.scss']
})

export class EquipmentDialogComponent implements OnInit {

  tempName:string;
  tempDescription:string;
  tempEquip: Equipment = {name: "", description: "", quantity: 0, carried: "No", weight:0, equipType:"None", equipped:"No"};

  constructor(
    private character: CharacterService,
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private equipDialog: MatDialogRef<EquipmentComponent>,
  ) { }

  ngOnInit(): void {
    this.tempName = this.data.name;
    this.tempDescription = this.data.description;
  }
  
  closeDialog(){
    this.equipDialog.close();
  }

  saveEquipment(){
    this.tempEquip = {name: this.data.name, description: this.data.description, quantity: this.data.quantity, carried: this.data.carried, weight: this.data.weight, equipType: this.data.equipType, equipped: this.data.equipped};
    this.character.updateEquipment(this.data.equipment, this.tempEquip);
    this.equipDialog.close();
  }

  deleteEquipment(){
    this.character.deleteEquipment(this.data.equipment);
    this.equipDialog.close();
  } 

 

}
