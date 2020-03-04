import { Component, OnInit, Input, Output , EventEmitter} from '@angular/core';
import { RoundDetail } from '../model/round-details-model';
import { RoundDetailsService } from '../services/round-details.service';
import { Router, ActivatedRoute } from '@angular/router';
import { switchMap, catchError } from 'rxjs/operators';
import { combineLatest, throwError } from 'rxjs';
import { AppError } from '../common/apperror';
import { InterComponentService } from '../services/inter-component.service';
import { environment } from '../../environments/environment';
import { ModalData } from '../modal-content/modal-data-interface';
import { HolesService } from '../services/holes.service';
@Component({
  selector: 'app-add-round-details',
  templateUrl: './add-round-details.component.html',
  styleUrls: ['./add-round-details.component.css']
})
export class AddRoundDetailsComponent implements OnInit, ModalData {
private url = '/addAllRounds';
@Input() data: any;
@Input() roundHeader: any;
@Input() holes: any;
golfCourseId: number;
roundDetails: RoundDetail[];
playerId: any;
modalRef: any;
ngOnInit(): void {
  this.url = environment.url + '/addAllRounds';
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
)).subscribe( x => {
  let p = x;
});

  if (this.roundHeader == null) {
    this.loadFromModalDataInterface();
  }
  /*else {
    this.rearrangeRounds();
   }*/
  this.rearrangeRounds();
  for (let i = 0; i < this.holes.length; i++) {
      this.roundDetails[i] = new RoundDetail();
      this.roundDetails[i].holeId = this.holes[i].id;
      this.roundDetails[i].roundId = this.roundHeader.id;
      }
    /*this.roundDetails = this.roundDetails.sort(
      (rd1, rd2) =>
      {
        if(rd1.holeId <= rd2.holeId) return -1;
        else return 1;
      }
    );*/

    // console.log("Round Details!!!!" + this.roundDetails);
}
  constructor(
    private service: RoundDetailsService,
    private holesService: HolesService,
    private router: Router,
    private route: ActivatedRoute,
    private interCompService: InterComponentService) {

  }

   public addDetails() {
    console.log(this.roundDetails);
    let roundDetails: any[] = this.formatRequestPayload();
    console.log("converted "+ roundDetails);
    this.service.setUrl(this.url);
    this.service
    .add(roundDetails)
    .subscribe((response) => {
      // this.newRoundAdded.emit(response);
      let responseFromServer = response;
      // this.roundHeader.roundDetails = response.roundDetails;
      this.roundHeader = response;
      this.roundHeader.roundDetails = response.roundDetails;
      this.roundHeader.hcpIndex = response.hcpIndex;
      this.roundHeader.handicapDifferential = response.handicapDifferential;
      console.log('response:' + response);
      // console.log("round details added to server:" + this.roundHeader.roundDetails);
      if (this.modalRef != null) {
        this.modalRef.close(response);
      }/*else {
      this.router.navigate(['/golfCourse/' + this.golfCourseId + '/players/', this.playerId.toString()]);
      }*/
    });
  }
   public logChange(i) {
     console.log('shotsTaken' + this.roundDetails[i].shotsTaken);
   }

   private formatRequestPayload() {
     // console.log(this.roundDetails);
     let requestData = new Array(this.holes.length);
     for (let i = 0; i < this.roundDetails.length; i++) {
       requestData[i] = {
        'round' : { 'id' : this.roundDetails[i].roundId },
        'hole' : { 'id' : this.roundDetails[i].holeId },
        'shotsTaken': this.roundDetails[i].shotsTaken
       };
     }
     // console.log("formatted " + requestData.toString());
     // console.log("original " + this.roundDetails);
     return requestData;
   }

   public loadFromModalDataInterface() {
     console.log('In loadFromModalDataInterface');
     console.log('data ' + this.data.roundHeader.golfCourseId);
    if (this.roundHeader == null && this.data != null) {
      this.roundHeader = this.data.roundHeader;
      this.holes = this.data.holes;
      this.modalRef = this.data.modal;
    }

    if (this.holes == null ) {
      // fetch from server.
      this.holesService.setUrl(environment.url +
        '/golfCourses/' + 1 +
        '/holes');
        this.holes = this.holesService.getAll();
    }
    this.rearrangeRounds();
   }
   public rearrangeRounds() {
    this.roundDetails = new Array(this.holes.length);
    this.holes = this.holes.sort(
      (h1, h2) => {
        if ( h1.holeNumber <= h2.holeNumber ) return -1;
        else return 1;
      }
    );
   }

}
