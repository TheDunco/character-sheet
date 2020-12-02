import { Component, OnInit } from '@angular/core';
import { CharacterService } from 'src/app/services/character.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit {

  constructor(public character: CharacterService) { }

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
  
  changeProf(name: string): void {
    if (this.character.isProficient(name)) {
      this.character.removeProficiency(name)
    }
    else {
      this.character.addProficiency(name)
    }
    this.updateSkills();
  }
    
  updateSkills(): void {
    this.passiveInvestigation = this.character.toMod(this.character.abilityScores.intelligence) + 10;
    this.passivePerception = this.character.toMod(this.character.abilityScores.wisdom) + 10;
    this.acrobatics = this.character.toMod(this.character.abilityScores.dexterity) + (this.character.isProficient('acrobatics') ? this.character.proficiencyBonus : 0);
    this.animalHandling = this.character.toMod(this.character.abilityScores.wisdom) + (this.character.isProficient('animalHandling') ? this.character.proficiencyBonus : 0);
    this.arcana = this.character.toMod(this.character.abilityScores.intelligence) + (this.character.isProficient('arcana') ? this.character.proficiencyBonus : 0);
    this.athletics = this.character.toMod(this.character.abilityScores.strength) + (this.character.isProficient('athletics') ? this.character.proficiencyBonus : 0);
    this.deception = this.character.toMod(this.character.abilityScores.charisma) + (this.character.isProficient('deception') ? this.character.proficiencyBonus : 0);
    this.history = this.character.toMod(this.character.abilityScores.intelligence) + (this.character.isProficient('history') ? this.character.proficiencyBonus : 0);
    this.insight = this.character.toMod(this.character.abilityScores.wisdom) + (this.character.isProficient('insight') ? this.character.proficiencyBonus : 0);
    this.intimidation = this.character.toMod(this.character.abilityScores.charisma) + (this.character.isProficient('intimidation') ? this.character.proficiencyBonus : 0);
    this.investigation = this.character.toMod(this.character.abilityScores.intelligence) + (this.character.isProficient('investigation') ? this.character.proficiencyBonus : 0);
    this.medicine = this.character.toMod(this.character.abilityScores.wisdom) + (this.character.isProficient('medicine') ? this.character.proficiencyBonus : 0);
    this.nature = this.character.toMod(this.character.abilityScores.intelligence) + (this.character.isProficient('nature') ? this.character.proficiencyBonus : 0)
    this.perception = this.character.toMod(this.character.abilityScores.wisdom) + (this.character.isProficient('perception') ? this.character.proficiencyBonus : 0);
    this.performance = this.character.toMod(this.character.abilityScores.charisma) + (this.character.isProficient('performance') ? this.character.proficiencyBonus : 0);
    this.persuasion = this.character.toMod(this.character.abilityScores.charisma) + (this.character.isProficient('persuasion') ? this.character.proficiencyBonus : 0);
    this.religion = this.character.toMod(this.character.abilityScores.intelligence) + (this.character.isProficient('religion') ? this.character.proficiencyBonus : 0);
    this.sleightOfHand = this.character.toMod(this.character.abilityScores.dexterity) + (this.character.isProficient('sleightOfHand') ? this.character.proficiencyBonus : 0);
    this.stealth = this.character.toMod(this.character.abilityScores.dexterity) + (this.character.isProficient('stealth') ? this.character.proficiencyBonus : 0);
    this.survival = this.character.toMod(this.character.abilityScores.wisdom) + (this.character.isProficient('survival') ? this.character.proficiencyBonus : 0);
  }
  
  ngOnInit(): void { 
    this.updateSkills();
  }

}