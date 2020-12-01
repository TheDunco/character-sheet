import { Component, OnInit } from '@angular/core';
import {money,equipment, CharacterService} from '../../services/character.service';
import { MatDialog, MatDialogModule, MatDialogConfig } from '@angular/material/dialog';
import { EquipmentDialogComponent } from '../equipment-dialog/equipment-dialog.component';

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.scss']
})
export class EquipmentComponent implements OnInit {
  totalWeight:number = 0;
  moneyPouch: money = this.character.getMoney();
  equipmentList: equipment[] = this.character.getEquipment();
  constructor(private character: CharacterService, private matDialog: MatDialog ) { }

  ngOnInit(): void {
    for(let i = 0; i <this.equipmentList.length; i++){
      this.totalWeight += (this.equipmentList[i].weight*this.equipmentList[i].quantity)
    }
      this.totalWeight += this.moneyPouch.copperAmount*0.02+this.moneyPouch.silverAmount*0.02+this.moneyPouch.goldAmount*0.02+this.moneyPouch.platinumAmount*0.02

  }

  openEquipmentDialog(equipment: equipment) {
    const dialogConfig = new MatDialogConfig()
    this.matDialog.open(EquipmentDialogComponent, {

      width: '30vmax',
      data: {
        selectedEquipment: equipment
      }

    });
  }
}



