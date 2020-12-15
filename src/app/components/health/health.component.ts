import { Component, OnInit } from '@angular/core';
import { CharacterService, Health } from '../../services/character.service'

@Component({
  selector: 'app-health',
  templateUrl: './health.component.html',
  styleUrls: ['./health.component.scss']
})
export class HealthComponent implements OnInit {

  constructor(public character: CharacterService) { }
  
  ngOnInit(): void {
    this.updateHealth();
  }
  
  inputHP: string;
  inputHealthDamage: number;
  healthPercent: number;
  progressColor = "primary";

  gainHP(): void {
    if (this.character.health.hpCurrent + 1 <= this.character.health.hpMax) {
      this.character.health.hpCurrent += 1
      this.updateHealth();
    }
  }

  loseHP(): void {
    if (this.character.health.hpTemp > 0) {
      this.character.health.hpTemp -= 1;
    } else {
      this.character.health.hpCurrent -= 1
    }
    this.updateHealth();
  }

  setHP(): void {
    this.character.health.hpCurrent = Number(this.inputHP);
    this.inputHP = '';
    this.updateHealth();
  }
  
  heal(): void {
    if (this.character.health.hpCurrent + Number(this.inputHealthDamage) <= this.character.health.hpMax) {  
      if (this.inputHealthDamage != undefined) {
        this.character.health.hpCurrent += +this.inputHealthDamage;
      }
      this.updateHealth();
    } else {
      this.character.health.hpCurrent = this.character.health.hpMax;
    }
    this.updateHealth()
  }
  
  damage(): void {
    if (this.inputHealthDamage != undefined) {
      if (this.character.health.hpTemp - this.inputHealthDamage < 0) {
        let rollover = this.inputHealthDamage - this.character.health.hpTemp;
        this.character.health.hpTemp = 0;
        this.character.health.hpCurrent -= rollover;
      } else if (this.character.health.hpTemp > 0) {
        this.character.health.hpTemp -= +this.inputHealthDamage;      
      } else {
        this.character.health.hpCurrent -= +this.inputHealthDamage;
      }
    }
    this.updateHealth();
  }
  
  updateHealth(): void {
    this.healthPercent = (this.character.health.hpCurrent / this.character.health.hpMax) * 100
    if (this.healthPercent <= 50) {
      this.progressColor = "warn"
    } else {
      this.progressColor = "primary"
    }
  }
}
