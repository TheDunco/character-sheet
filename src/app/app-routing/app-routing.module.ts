import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharacterSheetComponent } from '../pages/character-sheet/character-sheet.component';
import { DashboardComponent } from '../pages/dashboard/dashboard.component'
import { LoginComponent } from '../pages/login/login.component';
import { AuthGuardService } from '../services/auth-guard/auth-guard.service'

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'character-sheet',
    component: CharacterSheetComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: '',
    component: LoginComponent,
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