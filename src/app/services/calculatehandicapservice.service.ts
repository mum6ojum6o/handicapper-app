import { Injectable, Input } from '@angular/core';
/********************************************************
 * This is a service which displays the player handicap
*********************************************************/
@Injectable({
  providedIn: 'root'
})
export class CalculatehandicapserviceService {
  private rounds: any[]
  constructor( ) {

   }
   calculateHandicap():number {
    //console.log('Calculating Handicap!'+this.rounds.length+this.rounds);
    if ( this.rounds == null ||
      this.rounds.length === 0) {
        return 0.0;
      }
      let numHcpsToConsider = this.numberOfIndicesToConsider();
      this.rounds = this.rounds.sort((r1,r2) => {
        if(r1.handicapDifferential <=r2.handicapDifferential) return -1;
        else return 1;
      });
      let handicapSum = 0;
      for(let i=0;i<numHcpsToConsider;i++){
        if(this.rounds[i] == 0) continue;
        handicapSum+=this.rounds[i].handicapDifferential;
      }
      console.log("handicapSum:"+handicapSum);
      return Math.floor(
        ((handicapSum/numHcpsToConsider) *
          this.rounds[0].tee.slopeRating)/ 113);
   }

   numberOfIndicesToConsider(): number {
     const roundsPlayed = this.rounds.length;
     if( roundsPlayed <= 6) { return 1; }
     else if (roundsPlayed <= 8) { return 2; }
     else if (roundsPlayed <= 10) { return 3; }
     else if (roundsPlayed <= 12) { return 4; }
     else if (roundsPlayed <= 14) { return 5; }
     else if (roundsPlayed <= 16) { return 6; }
     else if (roundsPlayed <= 17) { return 7; }
     else if (roundsPlayed <= 18) { return 8; }
     else if (roundsPlayed <= 19) { return 9; }
      else {
        return 0.0;
      }
   }
   setRounds(round: any[]) {
     this.rounds = round;
   }
}
