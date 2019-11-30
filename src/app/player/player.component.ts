import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlayerService } from '../services/player.service';
import {  switchMap, catchError, map } from 'rxjs/operators';
import { combineLatest, throwError } from 'rxjs';
import { AppError } from '../common/apperror';
import { RoundsService } from '../services/rounds.service';
import { InterComponentService } from '../services/inter-component.service';
import { CalculatehandicapserviceService } from '../services/calculatehandicapservice.service';
import { environment } from '../../environments/environment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalContentComponent } from '../modal-content/modal-content.component';
import { AddPlayerComponent } from '../add-player/add-player.component';
import { ModalType } from '../modal-content/modal-type/modal-type';
import { EditPlayerComponent } from '../edit-player/edit-player.component';
@Component({
  selector: 'player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  player: any;
  rounds: any[];
  golfCourseId: number;
  playerId: number;
  handicap: number;
  constructor(
    private route: ActivatedRoute,
    private service: PlayerService,
    private roundService: RoundsService,
    private icService: InterComponentService,
    private handicapCalculator: CalculatehandicapserviceService,
    private modalService: NgbModal) { }

  ngOnInit() {
    /*
    //the http call also works.
    //but I've commented it out because the data for the player would already have
    //been fetched on the playerlist component.

    */
      this.player = this.icService.getData();
      if (this.player != null ) {
        // console.log(this.player);
        this.rounds = this.player.rounds;
        this.playerId = this.player.id;
        this.golfCourseId = this.player.memberOf[0].id;
        // console.log('id: ' + this.golfCourseId);
        this.massageRoundDetails();
        this.handicapCalculator.setRounds(this.rounds);
        this.handicap = this.handicapCalculator.calculateHandicap();
      }
      else {
          this.loadPlayerFromServer();
      }
      this.checkForNewlyAddedRounds();
    }

    public loadPlayerFromServer() {
      combineLatest([
        this.route.paramMap,
        this.route.queryParamMap
      ])
        .pipe(
          switchMap( combined => {
              this.golfCourseId = +combined[0].getAll('id')[0];
              this.playerId = +combined[0].getAll('playerId')[0];
              // console.log(combined);
              // console.log('id from URL: ' + this.golfCourseId);
              this.service.setUrl(environment.url + '/golfCourses/' + this.golfCourseId + '/players/' + this.playerId);
              return this.service.getAll();
          }),
          catchError( (error: Response) => {
            return throwError(new AppError(error));
          }
        )).subscribe( player => {
          this.player = player;
          // console.log(this.player);
          this.rounds = player.rounds;
          this.massageRoundDetails();
          /*this.rounds.forEach( r => {
            r.handicapDifferential = r.handicapDifferential * 0.96;
            r.gamePlayedOn = new Date(r.gamePlayedOn).toLocaleDateString();
          });*/
          this.roundService.setRounds(this.player.rounds);
          this.handicapCalculator.setRounds(this.rounds);
          this.handicap = this.handicapCalculator.calculateHandicap();
          // console.log("handicap:" + this.handicap);
        });
    }

    private massageRoundDetails() {
      this.rounds.forEach( r => {
        r.handicapDifferential = r.handicapDifferential * 0.96;
        r.gamePlayedOn = new Date(r.gamePlayedOn).toLocaleDateString();
      });
    }
    private checkForNewlyAddedRounds() {
      let response = this.route.paramMap.pipe(map(() => window.history.state));
      response.subscribe(x => console.log("checkForNewlyAddedRounds:"+x));
      //console.log("new object added:"+ response.id);
    }
    public openModal() {
      const modalRef = this.modalService.open(ModalContentComponent);
      // console.log('playerId:'+this.player.id);
      modalRef.componentInstance.modalType = new ModalType(EditPlayerComponent,
        {
          firstName : this.player.firstName,
          lastName: this.player.lastName,
          email: this.player.email,
          phoneNumber: this.player.phoneNumber,
          playerId: this.player.id,
          memberOf: this.golfCourseId,
          modal: modalRef
        });
      modalRef.componentInstance.loadModal();
      modalRef.result.then( response => {
        // console.log('response of Modal Close:'+ response);
        this.player = response;
      });
    }

}
