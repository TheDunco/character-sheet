import { Component, OnInit } from '@angular/core';
import { CharacterService } from 'src/app/services/character.service';

@Component({
  selector: 'app-proficiency',
  templateUrl: './proficiency.component.html',
  styleUrls: ['./proficiency.component.scss']
})
export class ProficiencyComponent implements OnInit {
  constructor(public character: CharacterService) { }
  
  ngOnInit(): void { this.update() }
  
  profBonus: number
  selectedAbility = this.character.spellcastingAbility;
  // Spell save DC = 8 + proficiency bonus + spellcasting mod
  spellSaveDC: number;
  // Spell attack = spellcasting mod + proficiency bonus
  attackBonus: number;
  languages = this.character.languages
  miscProfs = this.character.miscProfs
  
  update(): void {
    this.profBonus = this.character.proficiencyBonus;
    this.character.setSpellCastingAbility(this.selectedAbility)
    
    this.character.setLanguages(this.languages)
    this.languages = this.character.languages
    
    this.character.setMiscProfs(this.miscProfs)
    this.miscProfs = this.character.miscProfs
    
    // Spell save DC = 8 + proficiency bonus + spellcasting mod
    this.spellSaveDC = this.character.proficiencyBonus + 8 + this.character.toMod(this.character.getAbilityScore(this.selectedAbility));
    
    // Spell attack = spellcasting mod + proficiency bonus
    this.attackBonus = this.character.toMod(this.character.getAbilityScore(this.selectedAbility)) + this.character.proficiencyBonus;
  }
}
