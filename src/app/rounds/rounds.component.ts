import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'rounds',
  templateUrl: './rounds.component.html',
  styleUrls: ['./rounds.component.css']
})
export class RoundsComponent {
  @Input() rounds: any[];
  @Input() holes: any;
  roundDetails: any[];
  expanded: boolean;
  constructor() {
    this.expanded = false;
  }

  onClick(i: number) {
    //console.log(i);
    this.expanded = !this.expanded;
    this.roundDetails = this.rounds[i].roundDetails;
  }
  public updateRounds(roundHeader: any) {
    //console.log('update ROunds roundHeader' + roundHeader.id );
    //console.log('rounds' + this.rounds[roundHeader.id]);
    for(let i = 0; i< this.rounds.length; i++) {
      if (this.rounds[i].id == roundHeader.id) {
        this.rounds[i].roundDetails = roundHeader.roundDetails;
        this.rounds[i].shotsTaken = roundHeader.shotsTaken;
        this.rounds[i].adjustedScore = roundHeader.adjustedScore;
        this.rounds[i].handicapDifferential = roundHeader.handicapDifferential;
      }
    }
  }

}
