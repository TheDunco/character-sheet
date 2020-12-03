import { Component, Input, OnInit } from '@angular/core';
import {action, CharacterService} from '../../services/character.service';


@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent implements OnInit {

  actionList: action[] = this.character.getActions();
  hasMelee: boolean = false;
  hasRange: boolean = false;
  hasMagic: boolean = false;
  hasPotion: boolean = false;
  hasSpecial: boolean = false;
  hasPower: boolean = false;
  hasSpell: boolean = false;

  constructor(private character: CharacterService) {

    for (let i = 0; i < this.actionList.length; i++){
      switch (this.actionList[i].actionType){
        case "Magic Item": {this.hasMagic = true;
          break;}
        case "Melee": {this.hasMelee = true;
          break;}
        case "Potion": {this.hasPotion = true;
          break;}
        case "Power": {this.hasPower = true;
          break;}
        case "Range": {this.hasRange = true;
          break;}
        case "Special": {this.hasSpecial = true;
          break;}
        case "Spell": {this.hasSpell = true;
          break;}
      }
    }
   }

  ngOnInit(): void {
  }

}
