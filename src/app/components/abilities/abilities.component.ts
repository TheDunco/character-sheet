import { Component, Input, OnInit } from '@angular/core';
import {abilities, CharacterService} from '../../services/character.service';

@Component({
  selector: 'app-abilities',
  templateUrl: './abilities.component.html',
  styleUrls: ['./abilities.component.scss']
})
export class AbilitiesComponent implements OnInit {

  abilityList: abilities[] = this.character.getAbilities();
  name: string;
  summary: string;
  description: string;

  constructor(private character: CharacterService ) { }

  ngOnInit(): void {
  }


}
