import { Component, OnInit } from '@angular/core';
import { CharacterService } from 'src/app/services/character.service';

@Component({
  selector: 'app-other',
  templateUrl: './other.component.html',
  styleUrls: ['./other.component.scss']
})
export class OtherComponent implements OnInit {

  constructor(private character: CharacterService) { }

  longRest() {
    this.character.health.hpCurrent = this.character.health.hpMax
    console.log(this.character.health.hpCurrent)
  }
  
  shortRest() {
    
  }
  ngOnInit(): void {
  }

}
