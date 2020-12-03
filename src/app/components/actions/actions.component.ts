import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent implements OnInit {

  @Input() name: string;
  @Input() description: string;
  constructor() { }

  ngOnInit(): void {
  }

}
