import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { HttpClientModule } from '@angular/common/http';


// Firebase/Firestore
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { firebaseConfig } from '../credentials.js';


// Angular Material
import { MatSliderModule } from '@angular/material/slider';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule} from '@angular/material/divider';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';


// Components
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
import { NoteDialogComponent } from './components/note-dialog/note-dialog.component';
import { AbilityDialogComponent } from './components/ability-dialog/ability-dialog.component';
import { HitDiceComponent } from './components/hit-dice/hit-dice.component';
import { DeathSavesComponent } from './components/death-saves/death-saves.component';
import { FeatDialogComponent } from './components/feat-dialog/feat-dialog.component';
import { EquipmentDialogComponent } from './components/equipment-dialog/equipment-dialog.component';
import { TrackablesDialogComponent } from './components/trackables-dialog/trackables-dialog.component';
import { SpellsDialogComponent } from './components/spells-dialog/spells-dialog.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CharacterSheetComponent } from './pages/character-sheet/character-sheet.component';
import { ActionDialogComponent } from './components/action-dialog/action-dialog.component';
import { LoginComponent } from './pages/login/login.component';
import { CurrencyDialogComponent } from './components/currency-dialog/currency-dialog.component';
import { NameChangeDialogComponent } from './components/name-change-dialog/name-change-dialog.component';

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
    NoteDialogComponent,
    AbilityDialogComponent,
    HitDiceComponent,
    DeathSavesComponent,
    FeatDialogComponent,
    EquipmentDialogComponent,
    TrackablesDialogComponent,
    SpellsDialogComponent,
    DashboardComponent,
    CharacterSheetComponent,
    ActionDialogComponent,
    LoginComponent,
    CurrencyDialogComponent,
    NameChangeDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatCheckboxModule,
    MatDialogModule,
    MatProgressBarModule,
    MatSelectModule,
    MatRadioModule,
    MatSlideToggleModule,
    HttpClientModule,
    MatAutocompleteModule,
    AppRoutingModule,
    MatMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
