import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'rounds',
  templateUrl: './rounds.component.html',
  styleUrls: ['./rounds.component.css']
})
export class RoundsComponent implements OnInit {
  @Input() rounds: any[];
  roundDetails: any[];
  expanded: boolean;
  constructor() {
    this.expanded = false;
  }

  ngOnInit() {
    console.log(this.rounds);
  }

  onClick(i: number) {
    console.log(i);
    this.expanded = !this.expanded;
    this.roundDetails = this.rounds[i].roundDetails;
  }
}
