import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-health',
  templateUrl: './health.component.html',
  styleUrls: ['./health.component.scss']
})
export class HealthComponent implements OnInit {

  constructor() { }

  hp: number = 30;
  maxHP: number = 30;
  inputHP: string;
  tempHP: number;
  inputHealthDamage: number;
  healthPercent: number;

  ngOnInit(): void {
    this.updateHealthPercent();
  }


  gainHP(): void {
    this.hp += 1
    this.updateHealthPercent();
  }

  loseHP(): void {
    if (this.tempHP > 0) {
      this.tempHP -= 1;
    } else {
      this.hp -= 1
    }
    this.updateHealthPercent();
  }

  setHP(): void {
    this.hp = Number(this.inputHP);
    this.inputHP = '';
    this.updateHealthPercent();
  }
  
  health(): void {
    if (this.inputHealthDamage != undefined) {
      this.hp += +this.inputHealthDamage;
    }
    this.updateHealthPercent();
  }
  
  damage(): void {
    if (this.inputHealthDamage != undefined) {
      if (this.tempHP - this.inputHealthDamage < 0) {
        let rollover = this.inputHealthDamage - this.tempHP;
        this.tempHP = 0;
        this.hp -= rollover;
      } else if (this.tempHP > 0) {
        this.tempHP -= +this.inputHealthDamage;      
      } else {
        this.hp -= +this.inputHealthDamage;
      }
      
    }
    this.updateHealthPercent();
  }
  
  updateHealthPercent(): void {
    this.healthPercent = (this.hp / this.maxHP) * 100
  }

}
