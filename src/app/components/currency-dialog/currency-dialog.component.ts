import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CharacterService } from 'src/app/services/character.service';
import { EquipmentComponent } from '../equipment/equipment.component';

@Component({
  selector: 'app-currency-dialog',
  templateUrl: './currency-dialog.component.html',
  styleUrls: ['./currency-dialog.component.scss']
})
export class CurrencyDialogComponent implements OnInit {
  constructor(
    private character: CharacterService,
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private currDialog: MatDialogRef<EquipmentComponent>,) { }

  ngOnInit(): void { }
  
  inputCurrency: number = 0;
  money = this.character.money
  
  addCurrency() {
    if (this.data.type === "Gold" && this.inputCurrency != 0) { this.money.goldAmount += +this.inputCurrency}
    if (this.data.type === "Copper" && this.inputCurrency != 0) { this.money.copperAmount += +this.inputCurrency}
    if (this.data.type === "Silver" && this.inputCurrency != 0) { this.money.silverAmount += +this.inputCurrency}
    if (this.data.type === "Platinum" && this.inputCurrency != 0) { this.money.platinumAmount += +this.inputCurrency}
  }
  
  subtractCurrency() {
    if (this.data.type === "Gold" && this.money.goldAmount - this.inputCurrency >= 0 && this.inputCurrency != 0) { this.money.goldAmount -= +this.inputCurrency}
    if (this.data.type === "Copper" && this.money.copperAmount - this.inputCurrency >= 0 && this.inputCurrency != 0) { this.money.copperAmount -= +this.inputCurrency}
    if (this.data.type === "Silver" && this.money.silverAmount - this.inputCurrency >= 0 && this.inputCurrency != 0) { this.money.silverAmount -= +this.inputCurrency}
    if (this.data.type === "Platinum" && this.money.platinumAmount - this.inputCurrency >= 0 && this.inputCurrency != 0) { this.money.platinumAmount -= +this.inputCurrency}
  }
  
  
  addOneToCurrency() {
    if (this.data.type === "Gold") { this.money.goldAmount += 1}
    if (this.data.type === "Copper") { this.money.copperAmount += 1}
    if (this.data.type === "Silver") { this.money.silverAmount += 1}
    if (this.data.type === "Platinum") { this.money.platinumAmount += 1}
  }
  
  subtractOneFromCurrency() {
    if (this.data.type === "Gold" && this.money.goldAmount - 1 >= 0) { this.money.goldAmount -= 1}
    if (this.data.type === "Copper" && this.money.copperAmount - 1 >= 0) { this.money.copperAmount -= 1}
    if (this.data.type === "Silver" && this.money.silverAmount - 1 >= 0) { this.money.silverAmount -= 1}
    if (this.data.type === "Platinum" && this.money.platinumAmount - 1 >= 0) { this.money.platinumAmount -= 1}
  }

  closeCurrency(){
    this.currDialog.close();
  }
  
  saveCurrency() {
    this.character.setMoney(this.money)
    this.currDialog.close();
  }
  

}
