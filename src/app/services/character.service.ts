import { Injectable, ɵsetCurrentInjector } from '@angular/core';
import { ɵangular_packages_platform_browser_platform_browser_k } from '@angular/platform-browser';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  name = "Mr. Tester"
  setName(newName: string): void { this.name = newName }
  
  class = "Paladin"
  setClass(newClass: string): void { this.class = newClass }
  
  xp = 500
  setXP(newXP: number): void {
    this.xp = newXP;
    this.levelSet()
  }
  


  
  level = 2
  
  spellcastingAbility = "charisma";
   setSpellCastingAbility(newAb: string): void {
    this.spellcastingAbility = newAb;
  }
  
  languages = "Common"
  setLanguages(newLanguages: string): void { this.languages = newLanguages }
  miscProfs = "Thieves Tools, Martial Weapons"
  setMiscProfs(newProfs: string): void { this.miscProfs = newProfs }
  
  
  levelSet(): void {
    if (this.xp >= 0 && this.xp < 300) {
      this.level = 1; 
      this.proficiencyBonus = 2;
    } else
    if (this.xp >= 300 && this.xp < 900) {
      this.level = 2; 
      this.proficiencyBonus = 2;
    } else
    if (this.xp >= 900 && this.xp < 2700) {
      this.level = 3;
      this.proficiencyBonus = 2;
    } else
    if (this.xp >= 2700 && this.xp < 6500) {
      this.level = 4; 
      this.proficiencyBonus = 2;
    } else
    if (this.xp >= 6500 && this.xp < 14000) {
      this.level = 5; 
      this.proficiencyBonus = 3;
    } else
    if (this.xp >= 14000 && this.xp < 23000) {
      this.level = 6; 
      this.proficiencyBonus = 3;
    } else
    if (this.xp <= 23000 && this.xp < 34000) {
      this.level = 7; 
      this.proficiencyBonus = 3;
    } else
    if (this.xp >= 34000 && this.xp < 48000) {
      this.level = 8; 
      this.proficiencyBonus = 3;
    } else
    if (this.xp >= 48000 && this.xp < 64000) {
      this.level = 9; 
      this.proficiencyBonus = 4;
    } else
    if (this.xp >= 64000 && this.xp < 85000) {
      this.level = 10; 
      this.proficiencyBonus = 4;
    } else
      if (this.xp >= 85000 && this.xp < 100000) {
      this.level = 11;
      this.proficiencyBonus = 4;
    } else
    if (this.xp >= 100000 && this.xp < 120000) {
      this.level = 12; 
      this.proficiencyBonus = 4;
    } else
    if (this.xp >= 120000 && this.xp < 140000) {
      this.level = 13; 
      this.proficiencyBonus = 5;
    } else
    if (this.xp >= 140000 && this.xp < 165000) {
      this.level = 14; 
      this.proficiencyBonus = 5;
    } else
    if (this.xp >= 165000 && this.xp < 195000) {
      this.level = 15; 
      this.proficiencyBonus = 5;
    } else
    if (this.xp >= 195000 && this.xp < 225000) {
      this.level = 16; 
      this.proficiencyBonus = 5;
    } else
    if (this.xp >= 225000 && this.xp < 265000) {
      this.level = 17; 
      this.proficiencyBonus = 6;
    } else
    if (this.xp >= 265000 && this.xp < 305000) {
      this.level = 18; 
      this.proficiencyBonus = 6;
    } else
    if (this.xp >= 305000 && this.xp < 355000) {
      this.level = 19; 
      this.proficiencyBonus = 6;
    } else
    if (this.xp >= 355000) {
      this.level = 20;
      this.proficiencyBonus = 6;
    }
    else {
      this.level = 0;
      this.proficiencyBonus = 0;
    }
    this.health.hitDiceMax = this.level;
  }
  
  // Health
  health: health = {
    hpCurrent: 30,
    hpMax: 30,
    hpTemp: 10,
    hitDiceCurrent: 0,
    hitDiceMax: 3,
    hitDiceType: 8,
    deathSaveFails: 0,
    deathSaveSuccesses: 0
  }
  getHealth(): health {
    return this.health
  }
  setHealth(newHealth: health) {
    this.health = newHealth;
  }
  
  summary: summary = {
    age: "21",
    height: "5'0\"",
    weight: "150",
    eyes: "Blue",
    hair: "Brown",
    skin: "White",
    race: "Human",
    class: "Paladin",
    alignment: "Neutral", //(dropdown eventually)
    background: "Acolyte"
  }
  
  setSummary(newSum: summary): void {
    this.summary = newSum;
  }
  
  // Ability Scores
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
  getAbilityScore(which: string): number {
    switch (which) {
      case 'charisma': return this.abilityScores.charisma;
      case 'constitution': return this.abilityScores.constitution;
      case 'dexterity': return this.abilityScores.dexterity;
      case 'intelligence': return this.abilityScores.intelligence;
      case 'strength': return this.abilityScores.strength;
      case 'wisdom': return this.abilityScores.wisdom;
    }
  }
  setAbilityScores(newScores: abilityScore) {
    this.abilityScores = newScores;
  }
  
  // Proficiencies
  proficiencies: string[] = ["charismaSave", "sleightOfHand", "investigation"]
  
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
  
  exampleAbility: abilities = {name: "Assassinate", description: "Advantage and automatic critical against surprised creatures.", summary: "During its first turn, this creature has advantage on attack rolls against any creature that hasn’t taken a turn. Any hit it scores against a surprised creature is a critical hit."};
  exampleAbility2: abilities =  {name: "Cunning Action", description: "Use a bonus action to Dash, Disengage, or Hide.",summary: "Your quick thinking and agility allow you to move and act quickly. You can take a bonus action on each of your turns in combat. This action can be used only to take the Dash, Disengage, or Hide action."};
  exampleAbilities = [this.exampleAbility, this.exampleAbility2];
  constructor() { }

  getAbilities(): abilities[]{
      
    return this.exampleAbilities;

  }

  userNotes: note ={nTitle:"This is the first title" , nDescription: "this is the first description" };
  userNotes2: note ={nTitle:"This is the first title2" , nDescription: "this is the first description2" };
  exampleNote = [this.userNotes , this.userNotes2];

  getNotes(): note[]{
    return this.exampleNote;
  }

  addNote(nData: note): void {
    this.exampleNote.push(nData);
  }

  updateNote(nData: note, oNote:string):void {
    const index = this.exampleNote.findIndex(item => item.nTitle === oNote);
    if (index > -1) {
      this.exampleNote[index].nTitle = nData.nTitle;
      this.exampleNote[index].nDescription = nData.nDescription;
    }
    else{
      this.exampleNote.push(nData);
    }
  }

  deleteNote(oNote:string){
    const index = this.exampleNote.findIndex(item => item.nTitle === oNote);
    if (index > -1) {
      // delete this.exampleNote[index];
      this.exampleNote.splice(index, 1);
    }
  }

  cloneNote(oNote:string){
    const index = this.exampleNote.findIndex(item => item.nTitle === oNote);
    this.exampleNote.push(this.exampleNote[index]);
  }

  userFeatExample: feat = {fTitle:"Title", fDescription: "dscription", fDetail:"detail", fSummary: "summary"}
  userFeat = [this.userFeatExample];

 
  updateFeat(fData: feat, oFeat:string){
    const index = this.userFeat.findIndex(item => item.fTitle === oFeat);
    if (index > -1) {
      this.userFeat[index].fTitle = fData.fTitle;
      this.userFeat[index].fDescription = fData.fDescription;
      this.userFeat[index].fDetail = fData.fDetail;
      this.userFeat[index].fSummary = fData.fSummary;
      
    }
    else{
      this.userFeat.push(fData);
    }
  }

  deleteFeat(oFeat:string){
    const index = this.userFeat.findIndex(item => item.fTitle === oFeat);
    if (index > -1) {
      this.userFeat.splice(index, 1);
    }
  }

  getFeat(): feat[]{
    return this.userFeat;
  }

  cloneFeat(oFeat:string){
    const index = this.userFeat.findIndex(item => item.fTitle === oFeat);
    this.userFeat.push(this.userFeat[index]);
  }

  exampleWeapon: equipment = {name: "Dagger", quantity: 2, carried: "Yes", weight: 1, equipType: "Weapon",description: " Category: Simple Melee Weapon" + '\n' + "Cost: 2gp\n Damage: 1d4 piercing\n Properties:Finesse, light, thrown (range 20/60)", equipped: "Yes"};
  exampleArmor: equipment = {equipped: "Yes", name: "Chain Shirt", quantity: 1, carried: "Yes", weight: 20, equipType: "Armor", description: " Type: Medium Armor \n Cost: 50 gp \n Armor Class: 13 \n\n Made of interlocking metal rings, a chain shirt is worn between layers of clothing or leather. This armor offers modest protection to the wearer’s upper body and allows the sound of the rings rubbing against one another to be muffled by outer layers"}
  exampleGear: equipment = {name: "Digsuise kit", quantity: 1, carried: "Yes", weight: 3, equipType: "Gear",equipped: "No", description: " Cost: 25gp  This pouch of cosmetics, hair dye, and small props lets you create disguises that change your physical appearance. Proficiency with this kit lets you add your proficiency bonus to any ability checks you make to create a visual disguise"}
  exampleGear2: equipment = {name: "Explorer's Pack", quantity: 1, carried: "Yes", weight: 3, equipType: "Gear",equipped: "No", description: " Cost: 10gp \n\n Includes a backpack, a bedroll, a mess kit, a tinderbox, 10 torches, 10 days of rations, and a waterskin. The pack also has 50 feet of hempen rope strapped to the side of it"};
  exampleTool: equipment = {name: "Thieve's Tools", weight: 1, quantity: 1, carried: "Yes", equipType: "Tool", equipped: "No", description: " Cost: 25 gp \n\n This set of tools includes a small file, a set of lock picks, a small mirror mounted on a metal handle, a set of narrow-bladed scissors, and a pair of pliers. Proficiency with these tools lets you add your proficiency bonus to any ability checks you make to disarm traps or open locks"}
  exampleWeapon2: equipment = {name: "Shortbow", weight: 2, quantity: 1, carried: "Yes", equipped: "No", equipType: "Weapon", description: " Category: Simple Ranged\n Cost: 25gp\n Damage: 1d6 piercing\n Properties: Ammunition (range 80/320). two-handed" }
  
  exampleEquipment: equipment[] = [this.exampleWeapon,this.exampleArmor,this.exampleGear,this.exampleGear2,this.exampleTool,this.exampleWeapon2];

  getEquipment(): equipment[]{
      
    return this.exampleEquipment;

  }

  exampleMoney: money = {copperAmount: 0, silverAmount: 2, goldAmount: 35, platinumAmount: 1};
  
  getMoney(): money{
    return this.exampleMoney;
  }
  
  tracklist = [
    {
      name: '1st Level Spell Slots',
      type: 'checkboxes',
      description: '',
      max: 4,
      current: 2
    },
    {
      name: '2nd Level Spell Slots',
      type: 'checkboxes',
      description: '2nd levels',
      max: 2,
      current: 1
    },
    {
      name: 'Exhaustion Levels',
      type: 'number',
      description: 'Levels of exhaustion',
      max: 6,
      current: 0
    }
  ]
  
  setTrackList(newList: trackable[]): void {
    this.tracklist = newList;
  }
  
  updateTrackable(tData: trackable, oTrack:string){
    const index = this.tracklist.findIndex(item => item.name === oTrack);
    if (index > -1) {
      this.tracklist[index].name = tData.name;
      this.tracklist[index].type = tData.type;
      this.tracklist[index].description = tData.description;
      this.tracklist[index].max = tData.max;
      this.tracklist[index].current = tData.current;
    }
    else{
      this.tracklist.push(tData);
    }
  }

  deleteTrack(oTrack:string){
    const index = this.tracklist.findIndex(item => item.name === oTrack);
    if (index > -1) {
      this.tracklist.splice(index, 1);
    }
  }

  cloneTrack(oTrack:string){
    const index = this.tracklist.findIndex(item => item.name === oTrack);
    this.tracklist.push(this.tracklist[index]);
  }
  
  spellList = [
    {
      name: "Puppet",
      summary: "Control a creature",
      description: "Your gesture forces one humanoid you can see within range to make a Constitution saving throw. On a failed save, the target must move up to its speed in a direction you choose. In addition, you can cause the target to drop whatever it is holding. This spell has no effect on a humanoid that is immune to being charmed.",
      level: 1,
      prepared: false,
      school: "Enchantment",
      srdUrl: "",
    },
    {
      description: "Casting Time: 1 action↵Range: 120 feet↵Components: V,S↵Duration: Instantaneous↵Concentration: false↵Ritual: false↵↵You hurl a mote of fire at a creature or object within range. Make a ranged spell attack against the target. On a hit, the target takes 1d10 fire damage. A flammable object hit by this spell ignites if it isn't being worn or carried.,This spell's damage increases by 1d10 when you reach 5th level (2d10), 11th level (3d10), and 17th level (4d10).",
      level: 0,
      name: "Fire Bolt",
      prepared: true,
      school: "Evocation",
      summary: "120 feet V,S Fire",
      srdUrl: "fire-bolt",
    },
    {
      description: "Casting Time: 1 action↵Range: 150 feet↵Components: V,S,M↵Duration: Instantaneous↵Concentration: false↵Ritual: false↵↵A bright streak flashes from your pointing finger to a point you choose within range and then blossoms with a low roar into an explosion of flame. Each creature in a 20-foot-radius sphere centered on that point must make a dexterity saving throw. A target takes 8d6 fire damage on a failed save, or half as much damage on a successful one.,The fire spreads around corners. It ignites flammable objects in the area that aren't being worn or carried.",
      level: 3,
      name: "Fireball",
      prepared: true,
      school: "Evocation",
      srdUrl: "fireball",
      summary: "150 feet V,S,M Fire",
    },
    {
      description: "Casting Time: 1 bonus action↵Range: Self↵Components: V↵Duration: Instantaneous↵Concentration: false↵Ritual: false↵↵Briefly surrounded by silvery mist, you teleport up to 30 feet to an unoccupied space that you can see.",
      level: 2,
      name: "Misty Step",
      prepared: false,
      school: "Conjuration",
      srdUrl: "misty-step",
      summary: "Self V ",
    }, 
    
  ]
  
  highestLevelSpell: number = 0;
  
  updateHighestLevelSpell() {
    this.spellList.forEach((spell) => {
      if (this.highestLevelSpell < spell.level) {
        this.highestLevelSpell = spell.level
      }
    })
    console.log(this.highestLevelSpell)
  }
  
  updateSpell(nSpell: spell, oSpellName: string) {
    const index = this.spellList.findIndex(item => item.name === oSpellName);
    if (index > -1) {
      this.spellList[index].name = nSpell.name;
      this.spellList[index].summary = nSpell.summary;
      this.spellList[index].description = nSpell.description;
      this.spellList[index].level = nSpell.level;
      this.spellList[index].prepared = nSpell.prepared;
      this.spellList[index].school = nSpell.school;
      this.spellList[index].srdUrl = nSpell.srdUrl;
    }
    else{
      this.spellList.push(nSpell);
    }
  }
  
  deleteSpell(sName) {
    const index = this.spellList.findIndex(item => item.name === sName);
    if (index > -1) {
      this.spellList.splice(index, 1);
    }
  }
}

export interface spell {
  name: string,
  summary: string,
  description: string,
  level: number,
  prepared: boolean,
  school: "Conjuration" | "Necromancy" | "Evocation" | "Abjuration" | "Transmutation" | "Divination" | "Enchantment" | "Illusion" | "Dunamancy"
  srdUrl: string
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

type equipmentType = "Armor" | "Weapon" | "Gear" | "Tool";
type yesNo = "Yes" | "No";

export interface money{
  copperAmount: number;
  silverAmount: number;
  goldAmount: number;
  platinumAmount: number;
}

export interface equipment{
  name: string;
  description: string,
  quantity: number
  carried: yesNo;
  weight: number;
  equipType: equipmentType;
  equipped: yesNo;
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


export interface note {
  nTitle: string,
  nDescription: string
}

export interface feat {
  fTitle: string,
  fDescription: string,
  fDetail: string,
  fSummary: string
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
  description: string,
  max: number,
  current: number,
}
