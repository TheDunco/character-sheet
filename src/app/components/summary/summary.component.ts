import { Component, OnInit } from '@angular/core';
import { CharacterService } from 'src/app/services/character.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {

  constructor(public character: CharacterService) { }

  localSummary = this.character.summary
  xp = this.character.xp
  level = this.character.level
  profBonus = this.character.proficiencyBonus
  
  updateSummary(): void {
    this.character.setXP(this.xp)
    this.xp = this.character.xp
    this.level = this.character.level
    this.profBonus = this.character.proficiencyBonus
    this.character.setSummary(this.localSummary)
  }
  ngOnInit(): void {
  }

}
