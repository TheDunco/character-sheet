import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharacterSheetComponent } from '../pages/character-sheet/character-sheet.component';
import { DashboardComponent } from '../pages/dashboard/dashboard.component'

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: 'character-sheet',
    component: CharacterSheetComponent
  }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ],
    declarations: []
})
export class AppRoutingModule { }