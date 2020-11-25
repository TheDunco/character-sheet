import { Injectable } from '@angular/core';
import { ɵangular_packages_platform_browser_platform_browser_k } from '@angular/platform-browser';

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
  
  // Proficiencies
  proficiencies: string[] = ["charismaSave"]
  
  // Will eventually be based off of level
  proficiencyBonus = 2;
  getProficiencyBonus(): number {
    return this.proficiencyBonus;
  }
  addProficiency(name: string): void {
    this.proficiencies.push(name)
  }
  removeProficiency(name: string): void {
    const index = this.proficiencies.findIndex(item => item == name);
    if (index > -1) {
      this.proficiencies.splice(index, 1);
    }
  }
  
  isProficient(x: string): boolean {
    return this.proficiencies.includes(x);
  }
  
  toMod(score: number): number {
    if (score == 1) {return -5}
    if (score == 2 || score == 3) {return -4}
    if (score == 4 || score == 5) {return -3}
    if (score == 6 || score == 7) {return -2}
    if (score == 8 || score == 9) {return -1}
    if (score == 10 || score == 11) {return 0}
    if (score == 12 || score == 13) {return 1}
    if (score == 14 || score == 15) {return 2}
    if (score == 16 || score == 17) {return 3}
    if (score == 18 || score == 19) {return 4}
    if (score == 20 || score == 21) {return 5}
    if (score == 22 || score == 23) {return 6}
    if (score == 24 || score == 25) {return 7}
    if (score == 26 || score == 27) {return 8}
    if (score == 28 || score == 29) {return 9}
    if (score == 30) {return 10}
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
