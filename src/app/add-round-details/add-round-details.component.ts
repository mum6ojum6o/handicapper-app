import { Component, OnInit, Input } from '@angular/core';
import { RoundDetail } from '../model/round-details-model';
import { RoundDetailsService } from '../services/round-details.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-round-details',
  templateUrl: './add-round-details.component.html',
  styleUrls: ['./add-round-details.component.css']
})
export class AddRoundDetailsComponent implements OnInit {

@Input() roundHeader: any;
@Input() holes: any;
roundDetails: RoundDetail[];
ngOnInit(): void {

  this.roundDetails = new Array(this.holes.length);
  for (let i = 0; i < this.holes.length; i++){
    this.roundDetails[i] = new RoundDetail();
    this.roundDetails[i].holeId = this.holes[i].id;
    this.roundDetails[i].roundId = this.roundHeader.id;
    }
}
  constructor(
    private service: RoundDetailsService,
    private router: Router) {

  }

   public addDetails() {
    console.log(this.roundDetails);
    let roundDetails: any[] = this.formatRequestPayload();
    console.log("converted "+ roundDetails);
    this.service
    .add(roundDetails)
    .subscribe((response) => {
      console.log("Round Details!!!!" + response);
      this.router.navigate(['/players/'], this.roundHeader.playedBy);
    });
   }
   public logChange(i) {
     console.log('shotsTaken' + this.roundDetails[i].shotsTaken);
   }

   private formatRequestPayload() {
     console.log(this.roundDetails);
     let requestData = new Array(this.holes.length);
     for (let i = 0; i < this.roundDetails.length; i++) {
       requestData[i] = {
        'round' : { 'id' : this.roundDetails[i].roundId },
        'hole' : { 'id' : this.roundDetails[i].holeId },
        'shotsTaken': this.roundDetails[i].shotsTaken,
        'timestamp': this.roundDetails[i].timestamp
       };
     }
     console.log("formatted " + requestData.toString());
     console.log("original " + this.roundDetails);
     return requestData;
   }


}
