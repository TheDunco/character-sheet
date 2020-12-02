import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CharacterService, note } from 'src/app/services/character.service';
import { SpellsDialogComponent } from '../spells-dialog/spells-dialog.component';

@Component({
  selector: 'app-spells',
  templateUrl: './spells.component.html',
  styleUrls: ['./spells.component.scss']
})
export class SpellsComponent implements OnInit {

constructor(public character: CharacterService, private matDialog: MatDialog) { }

ngOnInit(): void {
  this.character.updateHighestLevelSpell()
}
  

  openSpellDialog(name: string, summary: string, description: string, level: number, prepared: boolean, school: "Conjuration" | "Necromancy" | "Evocation" | "Abjuration" | "Transmutation" | "Divination" | "Enchantment" | "Illusion" | "Dunamancy", srdUrl: string){
    this.matDialog.open(SpellsDialogComponent, {
      width: '60vmax',
      data: {
        name: name,
        summary: summary,
        description: description,
        level: level,
        prepared: prepared,
        school: school,
        srdUrl: srdUrl
      }
    });

  }
  openNewSpellDialog(){
     this.matDialog.open(SpellsDialogComponent, {
       width: '60vmax',
       data: {
        name: "",
        summary: "",
        description: "",
        level: 1,
        prepared: false,
        school: "Conjuration",
        srdUrl: ""
      }
     });
  }

}
