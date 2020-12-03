import { Component, OnInit } from '@angular/core';
import { CharacterService, summary } from 'src/app/services/character.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {

  constructor(public character: CharacterService) { }

  localSummary: summary;
  xp: number;
  level: number;
  profBonus: number;
  
  update(): void {
    this.localSummary = this.character.summary
    this.xp = this.character.xp
    this.level = this.character.level
    this.profBonus = this.character.proficiencyBonus
  }
  
  setSummary(): void {
    this.character.setXP(this.xp)
    this.xp = this.character.xp
    this.level = this.character.level
    this.profBonus = this.character.proficiencyBonus
    this.character.setSummary(this.localSummary)
  }
  ngOnInit(): void {
    this.update()
  }

}
