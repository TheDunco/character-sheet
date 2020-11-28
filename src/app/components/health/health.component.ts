import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-health',
  templateUrl: './health.component.html',
  styleUrls: ['./health.component.scss']
})
export class HealthComponent implements OnInit {

  constructor() { }

  hp: number = 30;
  maxHP: number = 30;
  inputHP: string;

  ngOnInit(): void {
  }


  gainHP(): void {
    this.hp += 1
  }

  loseHP(): void {
    this.hp -= 1
  }

  setHP(): void {
    this.hp = Number(this.inputHP);
    this.inputHP = '';
  }

}
