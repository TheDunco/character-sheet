import { Component, OnInit } from '@angular/core';
import { CharacterService } from 'src/app/services/character.service';


@Component({
  selector: 'app-defenses',
  templateUrl: './defenses.component.html',
  styleUrls: ['./defenses.component.scss']
})

export class DefensesComponent implements OnInit {

  constructor(public character: CharacterService) { }

  ngOnInit(): void {
    this.character.updateAC()
  }

}
