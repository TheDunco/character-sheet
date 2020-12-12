import { Component, OnInit } from '@angular/core';
import { Money, Equipment, CharacterService } from '../../services/character.service';
import { MatDialog } from '@angular/material/dialog';
import { EquipmentDialogComponent } from '../equipment-dialog/equipment-dialog.component';
import { CurrencyDialogComponent } from '../currency-dialog/currency-dialog.component';

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.scss']
})
export class EquipmentComponent implements OnInit {
  constructor(private character: CharacterService, private matDialog: MatDialog) { }

  ngOnInit(): void {
    this.updateWeight()
  }
  
  totalWeight: number = 0;
  moneyPouch: Money = this.character.getMoney();
  equipmentList: Equipment[] = this.character.getEquipment();

  updateWeight(): void {
    this.totalWeight = 0;
    for (let i = 0; i < this.equipmentList.length; i++) {
      this.totalWeight += (this.equipmentList[i].weight * this.equipmentList[i].quantity)
    }
    this.totalWeight += this.moneyPouch.copperAmount * 0.02 + this.moneyPouch.silverAmount * 0.02 + this.moneyPouch.goldAmount * 0.02 + this.moneyPouch.platinumAmount * 0.02
  }
  
  openEquipmentDialog(equipment: Equipment) {
    this.matDialog.open(EquipmentDialogComponent, {

      width: '60vmax',
      data: {
        equipment: equipment,
        name: equipment.name,
        description: equipment.description,
        quantity: equipment.quantity,
        carried: equipment.carried,
        weight: equipment.weight,
        equipType: equipment.equipType,
        equipped: equipment.equipped
      }

    });
  }

  openNewEquipmentDialog() {
    this.matDialog.open(EquipmentDialogComponent, {
      width: '60vmax',
      data: {
        equipment: this.equipmentList,
        name: '',
        description: '',
        quantity: 0,
        carried: 'No',
        weight: 0,
        equipType: 'None',
        equipped: 'No'
      }
    });
  }
  
  openCurrencyDialog(type: string) {
    this.matDialog.open(CurrencyDialogComponent, {
      width: '250px',
      data: {
        type: type
      }
    });
  }
}



