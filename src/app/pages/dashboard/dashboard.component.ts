import { Component, OnInit } from '@angular/core';
import { GoogleAuthService } from 'src/app/services/google-auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(public auth: GoogleAuthService) { }
  
  signIn(): void {
    
  }
  ngOnInit(): void {
  }

}
