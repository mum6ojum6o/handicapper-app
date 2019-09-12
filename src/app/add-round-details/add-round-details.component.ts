import { Component, OnInit, Input } from '@angular/core';
import { RoundDetail } from '../model/round-details-model';
import { RoundDetailsService } from '../services/round-details.service';
import { Router, ActivatedRoute } from '@angular/router';
import { switchMap, catchError } from 'rxjs/operators';
import { combineLatest, throwError } from 'rxjs';
import { AppError } from '../common/apperror';
@Component({
  selector: 'app-add-round-details',
  templateUrl: './add-round-details.component.html',
  styleUrls: ['./add-round-details.component.css']
})
export class AddRoundDetailsComponent implements OnInit {
private url = 'http://localhost:8080/addAllRounds';
@Input() roundHeader: any;
@Input() holes: any;
golfCourseId: number;
roundDetails: RoundDetail[];
playerId: any;
ngOnInit(): void {

  combineLatest([
    this.route.paramMap,
    this.route.queryParamMap
  ]).pipe(
    switchMap( combined => {
      this.golfCourseId = +combined[0].getAll('id')[0];
      this.playerId = combined[0].getAll('playerId')[0];
      return null;
  }), catchError( (error: Response) => {
    return throwError(new AppError(error));
  }
)).subscribe( x =>{
  let p=x;
});


  this.roundDetails = new Array(this.holes.length);
  for (let i = 0; i < this.holes.length; i++){
    this.roundDetails[i] = new RoundDetail();
    this.roundDetails[i].holeId = this.holes[i].id;
    this.roundDetails[i].roundId = this.roundHeader.id;
    }
    console.log("Round Details!!!!" + this.roundHeader);
}
  constructor(
    private service: RoundDetailsService,
    private router: Router,
    private route: ActivatedRoute) {

  }

   public addDetails() {
    console.log(this.roundDetails);
    let roundDetails: any[] = this.formatRequestPayload();
    console.log("converted "+ roundDetails);
    this.service.setUrl(this.url);
    this.service
    .add(roundDetails)
    .subscribe((response) => {

      this.router.navigate(['/golfCourse/' + this.golfCourseId + '/players/'+this.playerId.toString()]);
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
