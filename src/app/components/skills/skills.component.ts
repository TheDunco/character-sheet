import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit {

  constructor() { }

  passiveInvestigation: Number;
  passivePerception: Number;
  acrobatics: Number;
  animalHandling: Number;
  arcana: Number;
  athletics: Number;
  deception: Number;
  history: Number;
  insight: Number;
  intimidation: Number;
  investigation: Number;
  medicine: Number;
  nature: Number;
  perception: Number;
  performance: Number;
  persuasion: Number;
  religion: Number;
  sleightOfHand: Number;
  stealth: Number;
  survival: Number;
  

  skillArray = Number[20];
  skillBonusArray = Number[20];
  
  ngOnInit(): void {
  }

}
