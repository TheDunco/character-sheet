import { Component, OnInit } from '@angular/core';
import { CharacterService, Health } from '../../services/character.service'

@Component({
  selector: 'app-health',
  templateUrl: './health.component.html',
  styleUrls: ['./health.component.scss']
})
export class HealthComponent implements OnInit {

  constructor(private character: CharacterService) { }

  health: Health = this.character.getHealth();
  //TODO: This will have to get moved to the character service at some point
  hp = this.health.hpCurrent;
  tempHP = this.health.hpTemp;
  inputHP: string;
  inputHealthDamage: number;
  healthPercent: number;
  progressColor = "primary";

  ngOnInit(): void {
    this.updateHealth();
  }


  gainHP(): void {
    if (this.hp + 1 <= this.health.hpMax) {
      this.hp += 1
      this.updateHealth();
    }
  }

  loseHP(): void {
    if (this.tempHP > 0) {
      this.tempHP -= 1;
    } else {
      this.hp -= 1
    }
    this.updateHealth();
  }

  setHP(): void {
    this.hp = Number(this.inputHP);
    this.inputHP = '';
    this.updateHealth();
  }
  
  heal(): void {
    if (this.hp + Number(this.inputHealthDamage) <= this.health.hpMax) {  
      if (this.inputHealthDamage != undefined) {
        this.hp += +this.inputHealthDamage;
      }
      this.updateHealth();
    } else {
      this.hp = this.health.hpMax;
    }
    this.updateHealth()
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
    this.updateHealth();
  }
  
  updateHealth(): void {
    this.character.setHealth(this.health)
    this.healthPercent = (this.hp / this.health.hpMax) * 100
    if (this.healthPercent <= 50) {
      this.progressColor = "warn"
    } else {
      this.progressColor = "primary"
    }
  }
  
  refresh(): void {
    this.health = this.character.health
  }

}
