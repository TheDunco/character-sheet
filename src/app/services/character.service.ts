import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  constructor() { 
  }
  
  // Ability Score
    abilityScores: abilityScore = {
    charisma: 8,
    constitution: 8,
    dexterity: 8,
    intelligence: 8,
    strength: 8,
    wisdom: 8,
  }
  getAbilityScores(): abilityScore {
    return this.abilityScores
  }
  setAbilityScores(newScores: abilityScore) {
    this.abilityScores = newScores;
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

export interface abilities {
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
