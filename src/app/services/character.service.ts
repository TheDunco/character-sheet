import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  exampleAbility: abilities = {name: "Assassinate", description: "Advantage and automatic critical against surprised creatures.", summary: "During its first turn, this creature has advantage on attack rolls against any creature that hasn’t taken a turn. Any hit it scores against a surprised creature is a critical hit."};
  exampleAbility2: abilities =  {name: "Cunning Action", description: "Use a bonus action to Dash, Disengage, or Hide.",summary: "Your quick thinking and agility allow you to move and act quickly. You can take a bonus action on each of your turns in combat. This action can be used only to take the Dash, Disengage, or Hide action."};
  exampleAbilities = [this.exampleAbility, this.exampleAbility2];
  constructor() { }

  getAbilities(): abilities[]{
      
    return this.exampleAbilities;
  }
}

export interface abilityScore {
  charisma: number,
  constitution: number,
  dexterity: number,
  intelligence: number,
  strength: number,
  wisdom: number
}

// Might not need these, probably can just make string arrays
export interface proficiencies {
  profArray: string[]
}
export interface spells {
  spellArray: string[]
}
export interface languages {
  languages: string
}
export interface miscProficiency {
  miscProf: string
}


export interface abilities{
  name: string,
  summary: string,
  description: string
}

export interface health {
  hpCurrent: number,
  hpMax: number,
  hpTemp: number,
  hitDiceCurrent: number,
  hitDiceMax: number,
  hitDiceType: number,
  deathSaveFails:number,
  deathSaveSuccesses: number
}

export interface equipment {
  name: string,
  description: string,
  quantity: number
}

export interface summary {
  age: string,
  height: string,
  weight: string,
  eyes: string,
  hair: string,
  skin: string,
  race: string,
  class: string,
  alignment: string, //(dropdown eventually)
  background: string
}

export interface level {
  xp: number,
  level: number,
  class: number
}

// This is subject to change and could get more complex if we wanted to 
// (by including a dice roller or something)
export interface action {
  name: string,
  description: string,
}

export interface trackable {
  name: string,
  type: 'checkboxes' | 'number',
  description: string
}
