import { Component } from '@angular/core';
import { GoogleAuthService } from './services/google-auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Character Sheet';

  
  constructor(public auth: GoogleAuthService){}


  newNoteEntered(){

  }
  
  
  ngOnInit() {
  }
}

