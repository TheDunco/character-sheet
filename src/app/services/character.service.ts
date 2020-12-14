import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Character } from './character-type';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  constructor(private afs: AngularFirestore, private router: Router) { }

  //TODO: BUG! If the character sheet is refreshed, these values get reverted
  
  //  ----------- Character Variables  -----------
  // These were the testing/debugging defaults, they now get overwritten by the setCharacterValues() method
  ID: string
  name: string = "Mr. Tester"
  class: string = "Paladin"
  xp: number = 500
  level: number = 2
  spellcastingAbility: string = "charisma";
  languages: string = "Common"
  miscProfs: string = "Thieves Tools, Martial Weapons"
  
  imageLink: string = "https://m.mythcreants.com/wp-content/uploads/2013/10/mysterman-180x135.png"
  
  // Health
  health: Health
    = {
    hpCurrent: 30,
    hpMax: 30,
    hpTemp: 10,
    hitDiceCurrent: 0,
    hitDiceMax: 3,
    hitDiceType: 8,
    deathSaveFails: 0,
    deathSaveSuccesses: 0
  }
  // Ability Scores
  abilityScores: AbilityScore
    = {
    charisma: 10,
    constitution: 10,
    dexterity: 10,
    intelligence: 10,
    strength: 10,
    wisdom: 10,
  }
  summary: Summary
    = {
    age: "21",
    height: "5'0\"",
    weight: "150",
    eyes: "Blue",
    hair: "Brown",
    skin: "White",
    race: "Human",
    class: "Paladin",
    alignment: "Neutral", //(dropdown eventually)
    background: "Acolyte",
    speed: 30,
  }
  defenses: Defense
    = {
    armorName: "Leather Armor",
    armorBonus: 1,
    shieldName: "",
    shieldBonus: 0,
    miscName: "",
    miscBonus: 0
  }
  initiative: number = this.toMod(this.abilityScores.dexterity)
  ac: number = this.toMod(this.abilityScores.dexterity) + 10
  
  exampleAbility: Ability = {name: "Assassinate", summary: "Advantage and automatic critical against surprised creatures.", description: "During its first turn, this creature has advantage on attack rolls against any creature that hasn’t taken a turn. Any hit it scores against a surprised creature is a critical hit."};
  exampleAbility2: Ability =  {name: "Cunning Action", summary: "Use a bonus action to Dash, Disengage, or Hide.",description: "Your quick thinking and agility allow you to move and act quickly. You can take a bonus action on each of your turns in combat. This action can be used only to take the Dash, Disengage, or Hide action."};
  abilityList: Ability[] = [this.exampleAbility, this.exampleAbility2];
  
  proficiencies: string[] = ["charismaSave", "sleightOfHand", "investigation", "Warhammer"]
  
  proficiencyBonus: number = 2;
  
  userNotes: Note ={nTitle:"This is the first title" , nDescription: "this is the first description" };
  userNotes2: Note ={nTitle:"This is the first title2" , nDescription: "this is the first description2" };
  notesList: Note[] = [this.userNotes, this.userNotes2];
  
  userFeatExample: Feat = {fTitle:"Title", fDescription: "dscription", fDetail:"detail", fSummary: "summary"}
  featsList: Feat[] = [this.userFeatExample];
  
  exampleWeapon: Equipment = {name: "Dagger", quantity: 2, carried: "Yes", weight: 1, equipType: "Weapon",description: " Category: Simple Melee Weapon" + '\n' + "Cost: 2gp\n Damage: 1d4 piercing\n Properties:Finesse, light, thrown (range 20/60)", equipped: "Yes"};
  exampleArmor: Equipment = {equipped: "Yes", name: "Chain Shirt", quantity: 1, carried: "Yes", weight: 20, equipType: "Armor", description: " Type: Medium Armor \n Cost: 50 gp \n Armor Class: 13 \n\n Made of interlocking metal rings, a chain shirt is worn between layers of clothing or leather. This armor offers modest protection to the wearer’s upper body and allows the sound of the rings rubbing against one another to be muffled by outer layers"}
  exampleGear: Equipment = {name: "Digsuise kit", quantity: 1, carried: "Yes", weight: 3, equipType: "Gear",equipped: "No", description: " Cost: 25gp  This pouch of cosmetics, hair dye, and small props lets you create disguises that change your physical appearance. Proficiency with this kit lets you add your proficiency bonus to any ability checks you make to create a visual disguise"}
  exampleGear2: Equipment = {name: "Explorer's Pack", quantity: 1, carried: "Yes", weight: 3, equipType: "Gear",equipped: "No", description: " Cost: 10gp \n\n Includes a backpack, a bedroll, a mess kit, a tinderbox, 10 torches, 10 days of rations, and a waterskin. The pack also has 50 feet of hempen rope strapped to the side of it"};
  exampleTool: Equipment = {name: "Thieve's Tools", weight: 1, quantity: 1, carried: "Yes", equipType: "Tool", equipped: "No", description: " Cost: 25 gp \n\n This set of tools includes a small file, a set of lock picks, a small mirror mounted on a metal handle, a set of narrow-bladed scissors, and a pair of pliers. Proficiency with these tools lets you add your proficiency bonus to any ability checks you make to disarm traps or open locks"}
  exampleWeapon2: Equipment = {name: "Shortbow", weight: 2, quantity: 1, carried: "Yes", equipped: "No", equipType: "Weapon", description: " Category: Simple Ranged\n Cost: 25gp\n Damage: 1d6 piercing\n Properties: Ammunition (range 80/320). two-handed" }
  
  equipmentList: Equipment[] = [this.exampleWeapon,this.exampleArmor,this.exampleGear,this.exampleGear2,this.exampleTool,this.exampleWeapon2];

  money: Money = {copperAmount: 0, silverAmount: 2, goldAmount: 35, platinumAmount: 1};
  
  tracklist: Trackable[]
    = [
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
  
  exampleMelee: Action = {name: "Unarmed Strike",description:"Your fists",actionType:"Melee",damage: String(this.toMod(this.abilityScores.strength)),damageType:"Bludgeoning",toHit: this.toMod(this.abilityScores.strength), abilityScore: "Strength", damageMisc: 0, hitMisc: 0, fullDamage: "0", fullToHit: "0"};
  exampleMelee2: Action = {name: "Warhammer",damageType:"Bludgeoning",actionType:"Melee",damage:"1d10",description:"A big hammer", toHit: this.toMod(this.abilityScores.strength), abilityScore: "Strength", damageMisc: 0, hitMisc: 0, fullDamage: "1d10+0", fullToHit: "0"};
  exampleMelee3: Action = {name: "Shortsword",damageType:"Piercing",actionType:"Melee",damage:"1d6",description:"A standard sword", toHit: this.toMod(this.abilityScores.strength), abilityScore: "Strength", damageMisc: 0, hitMisc: 0, fullDamage: "1d6+0", fullToHit: "0"};
  exampleRange: Action = {name: "Shortbow",damageType:"Piercing",actionType:"Range",damage:"1d6",description:"A standard bow", toHit: this.toMod(this.abilityScores.dexterity), abilityScore: "Dexterity", damageMisc: 0, hitMisc: 0, fullDamage: "1d6", fullToHit: "0"};
  exampleMagic: Action = {name:"Blade of Avernus (Vorpal)",damageType:"Slashing", actionType: "Magic Item", damage: "2d6",description:"Instant decapitation? Yes please!",toHit: this.toMod(this.abilityScores.strength), abilityScore: "Strength",damageMisc: 3, hitMisc: 3, fullDamage: "0", fullToHit: "2d6+5"};
  actionList: Action[] //= [this.exampleMelee,this.exampleMagic, this.exampleMelee2, this.exampleRange, this.exampleMelee3];

  spellList: Spell[]
    = [
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
  preppedSpells: number = 0;
  
  
  //  ----------- Character Methods  -----------
  setName(newName: string): void { this.name = newName; console.log(this.name) }
  
  setClass(newClass: string): void { this.class = newClass }
  
  setXP(newXP: number): void {
    this.xp = newXP;
    this.levelSet()
  }
  
   setSpellCastingAbility(newAb: string): void {
    this.spellcastingAbility = newAb;
  }
  
  setLanguages(newLanguages: string): void { this.languages = newLanguages }
  setMiscProfs(newProfs: string): void { this.miscProfs = newProfs }
  
  changeProf(name: string): void {
    if (this.isProficient(name)) {
      this.removeProficiency(name)
    }
    else {
      this.addProficiency(name)
    }
  }
  
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
  
  getHealth(): Health {
    return this.health
  }
  setHealth(newHealth: Health) {
    this.health = newHealth;
  }
  
  getAbilityScores(): AbilityScore {
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
  setAbilityScores(newScores: AbilityScore) {
    this.abilityScores = newScores;
  }
  
  setSummary(newSum: Summary): void {
    this.summary = newSum;
  }

  updateAC(): void {
    let bonus  = 10
    bonus += +this.defenses.armorBonus;
    bonus += +this.defenses.shieldBonus;
    bonus += +this.defenses.miscBonus;
    
    this.ac = this.toMod(this.abilityScores.dexterity) + bonus
    this.initiative = this.toMod(this.abilityScores.dexterity)
    
  }
  
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
  
  getAbilities(): Ability[]{
    return this.abilityList;
  }

  updateAbility(nAbility: Ability, oAbilityName: string) {
    const index = this.abilityList.findIndex(item => item.name === oAbilityName);
    if (index > -1) {
      this.abilityList[index].name = nAbility.name;
      this.abilityList[index].summary = nAbility.summary;
      this.abilityList[index].description = nAbility.description;
    }
    else{
      this.abilityList.push(nAbility);
    }
  }

  deleteAbility(aName) {
    const index = this.abilityList.findIndex(item => item.name === aName);
    if (index > -1) {
      this.abilityList.splice(index, 1);
    }
  }

  getNotes(): Note[]{
    return this.notesList;
  }

  addNote(nData: Note): void {
    this.notesList.push(nData);
  }

  updateNote(nData: Note, tNote:string, dNote:string):void {
    const index = this.notesList.findIndex(item => item.nTitle === tNote && item.nDescription === dNote);
    if (index > -1) {
      this.notesList[index].nTitle = nData.nTitle;
      this.notesList[index].nDescription = nData.nDescription;
    }
    else{
      this.notesList.push(nData);
    }
  }

  deleteNote(tNote:string, dNote:string){
    const index = this.notesList.findIndex(item => item.nTitle === tNote && item.nDescription === dNote);
    if (index > -1) {
      // delete this.exampleNote[index];
      this.notesList.splice(index, 1);
    }
  }

  cloneNote(oNote:string){
    const index = this.notesList.findIndex(item => item.nTitle === oNote);
    this.notesList.push(this.notesList[index]);
  }
  
  updateFeat(fData: Feat, oFeat:string){
    const index = this.featsList.findIndex(item => item.fTitle === oFeat);
    if (index > -1) {
      this.featsList[index].fTitle = fData.fTitle;
      this.featsList[index].fDescription = fData.fDescription;
      this.featsList[index].fDetail = fData.fDetail;
      this.featsList[index].fSummary = fData.fSummary;
      
    }
    else{
      this.featsList.push(fData);
    }
  }

  deleteFeat(oFeat:string){
    const index = this.featsList.findIndex(item => item.fTitle === oFeat);
    if (index > -1) {
      this.featsList.splice(index, 1);
    }
  }

  getFeat(): Feat[]{
    return this.featsList;
  }

  cloneFeat(oFeat:string){
    const index = this.featsList.findIndex(item => item.fTitle === oFeat);
    this.featsList.push(this.featsList[index]);
  }

  getEquipment(): Equipment[]{
 
    return this.equipmentList;

  }

  updateEquipment(equipment:Equipment, tempEquipment:Equipment){
    const index = this.equipmentList.findIndex(item => item.name === equipment.name && 
      item.description === equipment.description && 
      item.quantity === equipment.quantity && 
      item.carried === equipment.carried &&
      item.weight === equipment.weight &&
      item.equipped === equipment.equipped &&
      item.equipType === equipment.equipType);  
      if (index > -1) {
        this.equipmentList[index].name = tempEquipment.name;
        this.equipmentList[index].description = tempEquipment.description;
        this.equipmentList[index].quantity = tempEquipment.quantity;
        this.equipmentList[index].carried = tempEquipment.carried;
        this.equipmentList[index].weight = tempEquipment.weight;
        this.equipmentList[index].equipped = tempEquipment.equipped;
        this.equipmentList[index].equipType = tempEquipment.equipType;
        
      }
      else{
        this.equipmentList.push(tempEquipment);
      }
  }

  deleteEquipment(equipment:Equipment){
    const index = this.equipmentList.findIndex(item => item.name === equipment.name && 
      item.description === equipment.description && 
      item.quantity === equipment.quantity && 
      item.carried === equipment.carried &&
      item.weight === equipment.weight &&
      item.equipped === equipment.equipped &&
      item.equipType === equipment.equipType);   
    if (index > -1) {
      this.equipmentList.splice(index, 1);
    }
  }

  getMoney(): Money{
    return this.money;
  }
  
  setMoney(newMoney: Money) {
    this.money = newMoney
  }

  
  getActions(): Action[]{
    return this.actionList;
  }

  updateAction(nAction: Action, oActionName: string) {
    const index = this.actionList.findIndex(item => item.name === oActionName);
    if (index > -1) {
      this.actionList[index].name = nAction.name;
      this.actionList[index].actionType = nAction.actionType;
      this.actionList[index].description = nAction.description;
      this.actionList[index].damage = nAction.damage;
      this.actionList[index].damageType = nAction.damageType;
      this.actionList[index].damageMisc = nAction.damageMisc;
      this.actionList[index].hitMisc = nAction.hitMisc;
      this.actionList[index].fullDamage = nAction.fullDamage;
      this.actionList[index].fullToHit = nAction.fullToHit;
    }
    else{
      this.actionList.push(nAction);
    }
  }

  deleteAction(aName) {
    const index = this.actionList.findIndex(item => item.name === aName);
    if (index > -1) {
      this.actionList.splice(index, 1);
    }
  }
  
  setTrackList(newList: Trackable[]): void {
    this.tracklist = newList;
  }
  
  updateTrackable(tData: Trackable, oTrack:string){
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
    if (index > -1) {
      this.tracklist.push(this.tracklist[index]);
    }
  }
  
  updateHighestLevelSpell() {
    this.preppedSpells = 0;
    this.spellList.forEach((spell) => {
      if (this.highestLevelSpell < spell.level) {
        this.highestLevelSpell = spell.level
      }
      if (spell.prepared === true) {
        this.preppedSpells += 1
      }
    })
  }
  
  updateSpell(nSpell: Spell, oSpellName: string) {
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
  
  deleteSpell(sName: string) {
    const index = this.spellList.findIndex(item => item.name === sName);
    if (index > -1) {
      this.spellList.splice(index, 1);
    }
  }
  
  async setValuesToCurrentCharacter(): Promise<void> {
    const userRef = this.afs.collection('users').doc(`${localStorage.getItem("uid")}`);
    const doc = await userRef.ref.get();
    const data: any = doc.data()
    if (!doc.exists) {
      let index = data.characters.indexOf(x => x.name === localStorage.getItem("currentCharacterName"))
      console.log(index)
      if (index > -1) {
        console.log("Setting all character data to ", data.characters[index].name)
        this.setCharacterValues(data.characters[index])
      }
    } else {
      console.log("Doesn't exist", localStorage.getItem("uid"))
    }
  }
  
  setCharacterValues(character: Character) {
    this.name = character.name
    this.class = character.class
    this.xp = character.xp
    this.level = character.level
    this.spellcastingAbility = character.spellcastingAbility
    this.languages = character.languages
    this.miscProfs = character.miscProfs
    this.health = character.health
    this.abilityScores = character.abilityScores
    this.summary = character.summary
    this.defenses = character.defenses
    this.initiative = character.initiative
    this.ac = character.ac
    this.proficiencies = character.proficiencies
    this.proficiencyBonus = character.proficiencyBonus
    this.abilityList = character.abilityList
    this.notesList = character.notesList
    this.featsList = character.featsList
    this.equipmentList = character.equipmentList
    this.money = character.money
    this.actionList = character.actionList
    this.tracklist = character.tracklist
    this.spellList = character.spellList
    this.highestLevelSpell = character.highestLevelSpell
    this.preppedSpells = character.preppedSpells
    this.ID = character.ID
    this.imageLink = character.imageLink
  }
  
  getFullCharacter(): Character {
    return {
      name: this.name,
      class: this.class,
      xp: this.xp,
      level: this.level,
      spellcastingAbility: this.spellcastingAbility,
      languages: this.languages,
      miscProfs: this.miscProfs,
      health: this.health,
      abilityScores: this.abilityScores,
      summary: this.summary,
      defenses: this.defenses,
      initiative: this.initiative,
      ac: this.ac,
      proficiencies: this.proficiencies,
      proficiencyBonus: this.proficiencyBonus,
      abilityList: this.abilityList,
      notesList: this.notesList,
      featsList: this.featsList,
      equipmentList: this.equipmentList,
      money: this.money,
      actionList: this.actionList,
      tracklist: this.tracklist,
      spellList: this.spellList,
      highestLevelSpell: this.highestLevelSpell,
      preppedSpells: this.preppedSpells,
      ID: this.ID,
      imageLink: this.imageLink,
    }
  }
  
  newDefaultCharacter(): Character {
    return {
      name: "Blank",
      class: "",
      xp: 0,
      level: 1,
      spellcastingAbility: "Intelligence",
      languages: "",
      miscProfs: "",
      health: {
        hpMax: 10,
        hpCurrent: 10,
        hitDiceCurrent: 0,
        hitDiceMax: 1,
        deathSaveFails: 0,
        deathSaveSuccesses: 0,
        hitDiceType: 8,
        hpTemp: 0,
      },
      abilityScores: {
        charisma: 10,
        constitution: 10,
        dexterity: 10,
        intelligence: 10,
        strength: 10,
        wisdom: 10,
      },
      summary: {
        age: "",
        alignment: "",
        background: "",
        class: "",
        eyes: "",
        hair: "",
        height: "",
        race: "",
        skin: "",
        weight: "",
        speed: 30,
      },
      defenses: {
        armorBonus: 0,
        armorName: "",
        miscBonus: 0,
        miscName: "",
        shieldBonus: 0,
        shieldName: "",
      },
      initiative: 0,
      ac: 10,
      proficiencies: [""],
      proficiencyBonus: 2,
      abilityList: [],
      notesList: [{nTitle:"Greetings!" , nDescription: "Thank you so much for using our character sheet" }],
      featsList: [],
      equipmentList: [],
      money: {
        copperAmount: 0,
        silverAmount: 0,
        goldAmount: 0,
        platinumAmount: 0,
      },
      actionList: [{name: "Unarmed Strike",description:"Your fists",actionType:"Melee",damage: String(this.toMod(this.abilityScores.strength)),damageType:"Bludgeoning",toHit: this.toMod(this.abilityScores.strength), abilityScore: "Strength", damageMisc: 0, hitMisc: 0, fullDamage: "0", fullToHit: "0"}],
      tracklist: [{
        name: 'Inspiration',
        type: 'checkboxes',
        description: 'Inspiration is given out by the DM for good role playing. It allows you to re-roll one d20 roll',
        max: 1,
        current: 0
      }],
      spellList: [],
      highestLevelSpell: 0,
      preppedSpells: 0,
      ID: uuidv4(),
      imageLink: "https://m.mythcreants.com/wp-content/uploads/2013/10/mysterman-180x135.png"
    }
  }
}

//  ----------- Character Type Interfaces  -----------
export interface Defense {
  armorName: string,
  armorBonus: number,
  shieldName: string,
  shieldBonus: number,
  miscName: string,
  miscBonus: number,
}

export interface Spell {
  name: string,
  summary: string,
  description: string,
  level: number,
  prepared: boolean,
  school: "Conjuration" | "Necromancy" | "Evocation" | "Abjuration" | "Transmutation" | "Divination" | "Enchantment" | "Illusion" | "Dunamancy"
  srdUrl: string
}

export interface AbilityScore {
  charisma: number,
  constitution: number,
  dexterity: number,
  intelligence: number,
  strength: number,
  wisdom: number
}

export interface MiscProficiency {
  miscProf: string
}

export interface Ability{
  name: string,
  summary: string,
  description: string
}

export interface Health {
  hpCurrent: number,
  hpMax: number,
  hpTemp: number,
  hitDiceCurrent: number,
  hitDiceMax: number,
  hitDiceType: number,
  deathSaveFails:number,
  deathSaveSuccesses: number
}

export interface Money{
  copperAmount: number;
  silverAmount: number;
  goldAmount: number;
  platinumAmount: number;
}

export interface Equipment{
  name: string;
  description: string,
  quantity: number
  carried: "Yes" | "No";
  weight: number;
  equipType: "Armor" | "Weapon" | "Gear" | "Tool" | "None";
  equipped: "Yes" | "No";
}

export interface Summary {
  age: string,
  height: string,
  weight: string,
  eyes: string,
  hair: string,
  skin: string,
  race: string,
  class: string,
  alignment: string, //(dropdown eventually)
  background: string,
  speed: number,
}

export interface Level {
  xp: number,
  level: number,
  class: number
}


export interface Note {
  nTitle: string,
  nDescription: string
}

export interface Feat {
  fTitle: string,
  fDescription: string,
  fDetail: string,
  fSummary: string
}

export interface Action {
  name: string,
  description: string,
  actionType: "Power" | "Spell" | "Melee" | "Magic Item" | "Range" | "Potion" | "Special";
  damage: string,
  damageType: string,
  toHit: number,
  abilityScore: "Charisma" | "Constitution" | "Dexterity" | "Intelligence" | "Strength" | "Wisdom",
  damageMisc: number,
  hitMisc: number,
  fullToHit?: string,
  fullDamage?: string
}

export interface Trackable {
  name: string,
  type: 'checkboxes' | 'number',
  description: string,
  max: number,
  current: number,
}
