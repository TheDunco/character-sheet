import { Component, OnInit } from '@angular/core';
import { CharacterService, abilityScore } from '../../services/character.service';

@Component({
  selector: 'app-ability-score',
  templateUrl: './ability-score.component.html',
  styleUrls: ['./ability-score.component.scss']
})
export class AbilityScoreComponent implements OnInit {

  constructor(private character: CharacterService) { }

  ngOnInit(): void {}
  abilityScores = this.character.getAbilityScores()
  
  
}
