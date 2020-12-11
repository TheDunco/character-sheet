import { Component, OnInit } from '@angular/core';
import { CharacterService, Summary } from 'src/app/services/character.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {

  constructor(public character: CharacterService) { }

  localSummary: Summary;
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
  
  levels = [
    { xp: 0, level: 1 },
    { xp: 300,	level: 2 },
    { xp: 900,	level: 3 },
    { xp: 2700,	level: 4 },
    { xp: 6500,	level: 5 },
    { xp: 14000,	level: 6 },
    { xp: 23000,	level: 7 },
    { xp: 34000,	level: 8 },
    { xp: 48000,	level: 9 },
    { xp: 64000,	level: 10 },
    { xp: 85000,	level: 11 },
    { xp: 100000,	level: 12 },
    { xp: 120000,	level: 13 },
    { xp: 140000,	level: 14 },
    { xp: 165000,	level: 15 },
    { xp: 195000,	level: 16 },
    { xp: 225000,	level: 17 },
    { xp: 265000,	level: 18 },
    { xp: 305000,	level: 19 },
    { xp: 355000,	level: 20 },
  ]

}
