import { Component, OnInit } from '@angular/core';
import { CharacterService } from 'src/app/services/character.service';

@Component({
  selector: 'app-death-saves',
  templateUrl: './death-saves.component.html',
  styleUrls: ['./death-saves.component.scss']
})
export class DeathSavesComponent implements OnInit {
  constructor(private character: CharacterService) { }
  
  ngOnInit(): void { }

  localHealth = this.character.health
  
  updateHealth(): void {
    this.character.setHealth(this.localHealth)
  }
  
  addSuccess(): void {
    if (this.localHealth.deathSaveSuccesses < 3) {
      this.localHealth.deathSaveSuccesses += 1
    }
    this.updateHealth()
  }
  
   minusSuccess(): void {
    if (this.localHealth.deathSaveSuccesses > 0) {
      this.localHealth.deathSaveSuccesses -= 1
    }
     this.updateHealth()
   }
  
  addFail(): void {
    if (this.localHealth.deathSaveFails < 3) {
      this.localHealth.deathSaveFails += 1
    }
    this.updateHealth()
  }
  
  minusFail(): void {
    if (this.localHealth.deathSaveFails > 0) {
      this.localHealth.deathSaveFails -= 1
    }
     this.updateHealth()
  }
}
