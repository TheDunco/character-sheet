import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CharacterService, abilityScore } from '../../services/character.service';
import { SkillsComponent } from '../skills/skills.component'

@Component({
  selector: 'app-ability-score',
  templateUrl: './ability-score.component.html',
  styleUrls: ['./ability-score.component.scss']
})
export class AbilityScoreComponent implements OnInit {

  constructor(private character: CharacterService) { }

  ngOnInit(): void {
    this.updateMods()
    this.updateMods()
    this.checkProfs()
  }
  abilityScores = this.character.getAbilityScores();
  
  charisma = this.abilityScores.charisma;
  constitution = this.abilityScores.constitution;
  dexterity = this.abilityScores.dexterity;
  intelligence = this.abilityScores.intelligence;
  strength = this.abilityScores.strength;
  wisdom = this.abilityScores.wisdom;
  
  charismaSave: number; 
  charismaMod: number;
  charismaProf = false;
  constitutionSave: number;
  constitutionMod: number;
  constitutionProf = false;
  dexteritySave: number;
  dexterityMod: number;
  dexterityProf = false;
  intelligenceSave: number;
  intelligenceMod: number;
  intelligenceProf = false;
  strengthSave: number;
  strengthMod: number;
  strengthProf = false;
  wisdomSave: number;
  wisdomMod: number;
  wisdomProf = false;
  
  checkProfs(): void {
    if (this.character.isProficient('charismaSave')) { this.charismaProf = true } else { this.charismaProf = false}
    if (this.character.isProficient('constitutionSave')) { this.constitutionProf = true } else { this.constitutionProf = false}
    if (this.character.isProficient('dexteritySave')) { this.dexterityProf = true } else { this.dexterityProf = false}
    if (this.character.isProficient('intelligenceSave')) { this.intelligenceProf = true } else { this.intelligenceProf = false}
    if (this.character.isProficient('strengthSave')) { this.strengthProf = true } else { this.strengthProf = false}
    if (this.character.isProficient('wisdomSave')) { this.wisdomProf = true } else { this.wisdomProf = false}
  }
  
  changeProf(name: string, prof: boolean): void {
    if (prof) {
      this.character.removeProficiency(name)
    }
    else {
      this.character.addProficiency(name)
    }
    console.log(this.character.proficiencies)
    this.checkProfs()
    this.updateMods()
    this.setAbilityScores()
  }
  
  updateMods(): void {
    this.charismaMod = this.character.toMod(this.charisma)
    this.charismaSave = (this.character.isProficient('charismaSave') ? this.charismaMod + this.character.getProficiencyBonus() : this.charismaMod)
    this.constitutionMod = this.character.toMod(this.constitution)
    this.constitutionSave = (this.character.isProficient('constitutionSave') ? this.constitutionMod + this.character.getProficiencyBonus() : this.constitutionMod)
    this.dexterityMod = this.character.toMod(this.dexterity)
    this.dexteritySave = (this.character.isProficient('dexteritySave') ? this.dexterityMod + this.character.getProficiencyBonus() : this.dexterityMod)
    this.intelligenceMod = this.character.toMod(this.intelligence)
    this.intelligenceSave = (this.character.isProficient('intelligenceSave') ? this.intelligenceMod + this.character.getProficiencyBonus() : this.intelligenceMod)
    this.strengthMod = this.character.toMod(this.strength)
    this.strengthSave = (this.character.isProficient('strengthSave') ? this.strengthMod + +this.character.getProficiencyBonus() : this.strengthMod)
    this.wisdomMod = this.character.toMod(this.wisdom)
    this.wisdomSave = (this.character.isProficient('wisdomSave') ? this.wisdomMod + this.character.getProficiencyBonus() : this.wisdomMod)
  }
  
  setAbilityScores(): void {
    this.character.setAbilityScores({
      charisma: this.charisma,
      constitution: this.constitution,
      dexterity: this.dexterity,
      intelligence: this.intelligence,
      strength: this.strength,
      wisdom: this.wisdom
    })
    this.updateMods()
  }
}
