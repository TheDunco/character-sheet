import { Component, OnInit } from '@angular/core';
import { CharacterService } from 'src/app/services/character.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit {
  constructor(public character: CharacterService) { }
  
  ngOnInit(): void { 
    this.updateSkills();
  }
  
  passiveInvestigation: number
  passivePerception: number
  acrobatics: number
  animalHandling: number
  arcana: number
  athletics: number
  deception: number
  history: number
  insight: number
  intimidation: number
  investigation: number
  medicine: number
  nature: number
  perception: number
  performance: number
  persuasion: number
  religion: number
  sleightOfHand: number
  stealth: number
  survival: number
  
  changeProf(newProf: string): void {
    this.character.changeProf(newProf)
    console.log(this.character.proficiencies, newProf)
    this.updateSkills();
  }
  
  changeSpecProf(relatedSkill: string, expOrHalf: "Exp" | "Half"): void {
    
    if (expOrHalf === "Exp") {
      this.character.removeProficiency(`${relatedSkill}Half`)
      if (!this.character.isProficient(relatedSkill)) {
        this.character.addProficiency(relatedSkill)
      }
      this.changeProf(`${relatedSkill}Exp`)
    } 
    else if (expOrHalf === "Half") {
      this.character.removeProficiency(`${relatedSkill}Exp`)
      if (this.character.isProficient(relatedSkill)) {
        this.character.removeProficiency(relatedSkill)
      }
      this.changeProf(`${relatedSkill}Half`)
    }
  }
    
  updateSkills(): void {
    // Passive skills are 10 + mod
    this.passiveInvestigation = this.character.toMod(this.character.abilityScores.intelligence) + 10;
    this.passivePerception = this.character.toMod(this.character.abilityScores.wisdom) + 10;
    
    // Other skills are skill + proficiency bonus
    this.acrobatics = this.character.toMod(this.character.abilityScores.dexterity)
     + (this.character.isProficient('acrobatics') ? this.character.proficiencyBonus : 0)
     + (this.character.isProficient('acrobaticsHalf') ? Math.floor(this.character.proficiencyBonus/2) : 0)
     + (this.character.isProficient('acrobaticsExp') ? this.character.proficiencyBonus : 0);
     
     
    this.animalHandling = this.character.toMod(this.character.abilityScores.wisdom)
     + (this.character.isProficient('animalHandling') ? this.character.proficiencyBonus : 0)
     + (this.character.isProficient('animalHandlingHalf') ? Math.floor(this.character.proficiencyBonus/2) : 0)
     + (this.character.isProficient('animalHandlingExp') ? this.character.proficiencyBonus : 0);
     
    this.arcana = this.character.toMod(this.character.abilityScores.intelligence)
     + (this.character.isProficient('arcana') ? this.character.proficiencyBonus : 0)
     + (this.character.isProficient('arcanaHalf') ? Math.floor(this.character.proficiencyBonus/2) : 0)
     + (this.character.isProficient('arcanaExp') ? this.character.proficiencyBonus : 0);
     
    this.athletics = this.character.toMod(this.character.abilityScores.strength)
     + (this.character.isProficient('athletics') ? this.character.proficiencyBonus : 0)
     + (this.character.isProficient('athleticsHalf') ? Math.floor(this.character.proficiencyBonus/2) : 0)
     + (this.character.isProficient('athleticsExp') ? this.character.proficiencyBonus : 0);
     
    this.deception = this.character.toMod(this.character.abilityScores.charisma)
     + (this.character.isProficient('deception') ? this.character.proficiencyBonus : 0)
     + (this.character.isProficient('deceptionHalf') ? Math.floor(this.character.proficiencyBonus/2) : 0)
     + (this.character.isProficient('deceptionExp') ? this.character.proficiencyBonus : 0);
     
    this.history = this.character.toMod(this.character.abilityScores.intelligence)
     + (this.character.isProficient('history') ? this.character.proficiencyBonus : 0)
     + (this.character.isProficient('historyHalf') ? Math.floor(this.character.proficiencyBonus/2) : 0)
     + (this.character.isProficient('historyExp') ? this.character.proficiencyBonus : 0);
     
    this.insight = this.character.toMod(this.character.abilityScores.wisdom)
     + (this.character.isProficient('insight') ? this.character.proficiencyBonus : 0)
     + (this.character.isProficient('insightHalf') ? Math.floor(this.character.proficiencyBonus/2) : 0)
     + (this.character.isProficient('insightExp') ? this.character.proficiencyBonus : 0);
     
    this.intimidation = this.character.toMod(this.character.abilityScores.charisma)
     + (this.character.isProficient('intimidation') ? this.character.proficiencyBonus : 0)
     + (this.character.isProficient('intimidationHalf') ? Math.floor(this.character.proficiencyBonus/2) : 0)
     + (this.character.isProficient('intimidationExp') ? this.character.proficiencyBonus : 0);
     
    this.investigation = this.character.toMod(this.character.abilityScores.intelligence)
     + (this.character.isProficient('investigation') ? this.character.proficiencyBonus : 0)
     + (this.character.isProficient('investigationHalf') ? Math.floor(this.character.proficiencyBonus/2) : 0)
     + (this.character.isProficient('investigationExp') ? this.character.proficiencyBonus : 0);
     
    this.medicine = this.character.toMod(this.character.abilityScores.wisdom)
     + (this.character.isProficient('medicine') ? this.character.proficiencyBonus : 0)
     + (this.character.isProficient('medicineHalf') ? Math.floor(this.character.proficiencyBonus/2) : 0)
     + (this.character.isProficient('medicineExp') ? this.character.proficiencyBonus : 0);
     
    this.nature = this.character.toMod(this.character.abilityScores.intelligence)
     + (this.character.isProficient('nature') ? this.character.proficiencyBonus : 0)
     + (this.character.isProficient('natureHalf') ? Math.floor(this.character.proficiencyBonus/2) : 0)
     + (this.character.isProficient('natureExp') ? this.character.proficiencyBonus : 0);
     
    this.perception = this.character.toMod(this.character.abilityScores.wisdom)
     + (this.character.isProficient('perception') ? this.character.proficiencyBonus : 0)
     + (this.character.isProficient('perceptionHalf') ? Math.floor(this.character.proficiencyBonus/2) : 0)
     + (this.character.isProficient('perceptionExp') ? this.character.proficiencyBonus : 0);
     
    this.performance = this.character.toMod(this.character.abilityScores.charisma)
     + (this.character.isProficient('performance') ? this.character.proficiencyBonus : 0)
     + (this.character.isProficient('performanceHalf') ? Math.floor(this.character.proficiencyBonus/2) : 0)
     + (this.character.isProficient('performanceExp') ? this.character.proficiencyBonus : 0);
     
    this.persuasion = this.character.toMod(this.character.abilityScores.charisma)
     + (this.character.isProficient('persuasion') ? this.character.proficiencyBonus : 0)
     + (this.character.isProficient('persuasionHalf') ? Math.floor(this.character.proficiencyBonus/2) : 0)
     + (this.character.isProficient('persuasionExp') ? this.character.proficiencyBonus : 0);
     
    this.religion = this.character.toMod(this.character.abilityScores.intelligence)
     + (this.character.isProficient('religion') ? this.character.proficiencyBonus : 0)
     + (this.character.isProficient('religionHalf') ? Math.floor(this.character.proficiencyBonus/2) : 0)
     + (this.character.isProficient('religionExp') ? this.character.proficiencyBonus : 0);
     
    this.sleightOfHand = this.character.toMod(this.character.abilityScores.dexterity)
     + (this.character.isProficient('sleightOfHand') ? this.character.proficiencyBonus : 0)
     + (this.character.isProficient('sleightOfHandHalf') ? Math.floor(this.character.proficiencyBonus/2) : 0)
     + (this.character.isProficient('sleightOfHandExp') ? this.character.proficiencyBonus : 0);
     
    this.stealth = this.character.toMod(this.character.abilityScores.dexterity)
     + (this.character.isProficient('stealth') ? this.character.proficiencyBonus : 0)
     + (this.character.isProficient('stealthHalf') ? Math.floor(this.character.proficiencyBonus/2) : 0)
     + (this.character.isProficient('stealthExp') ? this.character.proficiencyBonus : 0);
     
    this.survival = this.character.toMod(this.character.abilityScores.wisdom)
     + (this.character.isProficient('survival') ? this.character.proficiencyBonus : 0)
     + (this.character.isProficient('survivalHalf') ? Math.floor(this.character.proficiencyBonus/2) : 0)
     + (this.character.isProficient('survivalExp') ? this.character.proficiencyBonus : 0);
  }
}