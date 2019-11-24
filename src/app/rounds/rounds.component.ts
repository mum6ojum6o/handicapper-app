import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'rounds',
  templateUrl: './rounds.component.html',
  styleUrls: ['./rounds.component.css']
})
export class RoundsComponent {
  @Input() rounds: any[];
  @Input() holes: any[];
  roundDetails: any[];
  expanded: boolean;
  constructor() {
    this.expanded = false;
  }

  onClick(i: number) {
    console.log(i);
    this.expanded = !this.expanded;
    this.roundDetails = this.rounds[i].roundDetails;
  }
}
