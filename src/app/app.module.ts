import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms';


import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

// import { firebaseConfig } from './credentials.js';

import { MatSliderModule } from '@angular/material/slider';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
// import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';
import {MatDividerModule} from '@angular/material/divider';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatExpansionModule } from '@angular/material/expansion';
import {MatCheckboxModule} from '@angular/material/checkbox';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AbilityScoreComponent } from './components/ability-score/ability-score.component';
import { HealthComponent } from './components/health/health.component';
import { SummaryComponent } from './components/summary/summary.component';
import { ActionsComponent } from './components/actions/actions.component';
import { SkillsComponent } from './components/skills/skills.component';
import { TrackablesComponent } from './components/trackables/trackables.component';
import { SpellsComponent } from './components/spells/spells.component';
import { ProficiencyComponent } from './components/proficiency/proficiency.component';
import { DefensesComponent } from './components/defenses/defenses.component';
import { AbilitiesComponent } from './components/abilities/abilities.component';
import { EquipmentComponent } from './components/equipment/equipment.component';
import { FeatsComponent } from './components/feats/feats.component';
import { NotesComponent } from './components/notes/notes.component';

@NgModule({
  declarations: [
    AppComponent,
    AbilityScoreComponent,
    HealthComponent,
    SummaryComponent,
    ActionsComponent,
    SkillsComponent,
    TrackablesComponent,
    SpellsComponent,
    ProficiencyComponent,
    DefensesComponent,
    AbilitiesComponent,
    EquipmentComponent,
    FeatsComponent,
    NotesComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    // AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    // MatGridListModule,
    FlexLayoutModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatCheckboxModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
