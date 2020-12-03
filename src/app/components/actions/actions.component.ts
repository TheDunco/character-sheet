import { Component, Input, OnInit } from '@angular/core';
import { action, CharacterService } from '../../services/character.service';


@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent implements OnInit {

  hasMelee: boolean = false;
  hasRange: boolean = false;
  hasMagic: boolean = false;
  hasPotion: boolean = false;
  hasSpell: boolean = false;
  hasSpecial: boolean = false;
  hasPower: boolean = false;
  name: string;
  description: string;
  actionList: action[] = this.character.getActions();

  constructor(private character: CharacterService) {
    for (let i = 0; i < this.actionList.length; i++) {
      switch (this.actionList[i].actionType) {
        case "Melee": { this.hasMelee = true
           break;}
        case "Range": { this.hasRange = true
           break;}
        case "Magic Item": { this.hasMagic = true
           break;}
        case "Potion": { this.hasPotion = true
           break;}
        case "Spell": { this.hasSpell = true
           break;}
        case "Special": { this.hasSpecial = true
           break;}
        case "Power": { this.hasPower = true
           break;}
      }
    }
  }

  ngOnInit(): void {

  }

}
