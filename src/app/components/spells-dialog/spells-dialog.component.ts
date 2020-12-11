import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CharacterService, Spell } from 'src/app/services/character.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-spells-dialog',
  templateUrl: './spells-dialog.component.html',
  styleUrls: ['./spells-dialog.component.scss']
})
export class SpellsDialogComponent implements OnInit, AfterViewInit {
  
  tempName:string;
  tempSpell: Spell = {
        name: this.data.name,
        summary: this.data.summary,
        description: this.data.description,
        level: this.data.level,
        prepared: this.data.prepared,
        school: this.data.school,
        srdUrl: this.data.srdUrl
  };

  constructor(
    private character: CharacterService,
    private http: HttpClient,
    public spellDialog: MatDialogRef<SpellsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  resolveItems(): Observable<any> {
    // this.http is a HttpClient library provide by @angular/common
    // we are calling .get() method over this.http object
    // this .get() method takes URL to call API
    this.tempSpell.srdUrl = this.tempSpell.srdUrl.toLowerCase().trim().replace(' ', '-')
    return this.http.get("https://www.dnd5eapi.co/api/spells/" + this.tempSpell.srdUrl);
    }
    
  ngOnInit(): void {
    this.tempName = this.data.name;
    this.getRestData()
  }
  
  ngAfterViewInit(): void {
    this.getRestData()
  }
  
  getRestData(): void {
    if (this.tempSpell.srdUrl !== "") {
      this.resolveItems().subscribe(data => {
        console.log(data)
        this.tempSpell.name = data.name
        this.tempSpell.level = data.level
        this.tempSpell.summary = data.range + ' ' + data.components + ' ' + (data.damage !== undefined ? data.damage.damage_type.name : "" ) 
        this.tempSpell.school = data.school.name
        this.tempSpell.description =
          'Casting Time: ' + data.casting_time + '\n' +
          'Range: ' + data.range + '\n' +
          'Components: ' + data.components + '\n' +
          'Duration: ' + data.duration + '\n' +
          'Concentration: ' + data.concentration + '\n' +
          'Ritual: ' + data.ritual + '\n\n';
        data.desc.forEach((item: string) => this.tempSpell.description += item + '\n\n')
        this.tempSpell.description += (data.higher_level !== undefined ? '\n' + data.higher_level : "")
        this.tempSpell.description += '\n\nClasses: '
        data.classes.forEach((item: { name: string; }) => this.tempSpell.description += item.name + ', ')
        this.tempSpell.description = this.tempSpell.description.trim().slice(0, -1)
      })
    }
  }

  closeDialog(){
    this.spellDialog.close();
  }

  saveSpell(){
    this.character.updateSpell(this.tempSpell, this.tempName);
    this.character.updateHighestLevelSpell();
    // console.log(this.character);
    this.spellDialog.close();
  }

  deleteSpell(){
    this.character.deleteSpell(this.tempName);
    this.spellDialog.close();
  } 
}
