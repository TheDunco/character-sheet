import { Component, OnInit } from '@angular/core';
import { CharacterService } from 'src/app/services/character.service';


@Component({
  selector: 'app-hit-dice',
  templateUrl: './hit-dice.component.html',
  styleUrls: ['./hit-dice.component.scss']
})

export class HitDiceComponent implements OnInit {

  constructor(private character: CharacterService) { }

  localHealth = this.character.health
  
  gainHD() {
    if (this.localHealth.hitDiceCurrent + 1 <= this.character.level) {
      this.localHealth.hitDiceCurrent += 1
    }
    this.updateHitDice()
  }
  
  loseHD() {
    if (this.localHealth.hitDiceCurrent - 1 >= 0) {
      this.localHealth.hitDiceCurrent -= 1
    }
    this.updateHitDice()
  }
  
  updateHitDice() {
    this.character.setHealth(this.localHealth)
  }
  
  longRest(): void {
    this.localHealth.hitDiceCurrent = Math.floor(.5 * this.localHealth.hitDiceCurrent)
    this.updateHitDice()
  }
  
  shortRest(): void {
    console.log('Short Rest')
  }
  
  ngOnInit(): void {
  }

}
