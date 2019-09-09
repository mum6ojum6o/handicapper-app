import { Component, OnInit } from '@angular/core';
import { InterComponentService } from '../services/inter-component.service';
import { PlayerService } from '../services/player.service';
import {  switchMap, catchError } from 'rxjs/operators';
import { combineLatest, throwError } from 'rxjs';
import { AppError } from '../common/apperror';
import { ActivatedRoute } from '@angular/router';
import { RoundsService } from '../services/rounds.service';

@Component({
  selector: 'app-add-rounds',
  templateUrl: './add-rounds.component.html',
  styleUrls: ['./add-rounds.component.css']
})
export class AddRoundsComponent implements OnInit {
player: any ;
private headerStatus: boolean;
 gamePlayedOn: any;
 teeId: number;
 roundHeaderAdded: boolean;
 roundHeaderFromServer: any;
  constructor(private route: ActivatedRoute,
    private icService: InterComponentService,
    private playerService: PlayerService,
    private roundsService: RoundsService) {
    this.headerStatus = false;
    this.roundHeaderAdded = false;

   }

  ngOnInit() {
    this.player = this.icService.getData();
    if (this.player == null ) {
      this.loadPlayerFromServer();
    }
    console.log(this.player);

  }
  public headerAdded() {
    return this.headerStatus;
  }
  public getPlayer() {
    return this.player;
  }
  public loadPlayerFromServer(){
    console.log("fetching from Server!!!");
    combineLatest([
      this.route.paramMap,
      this.route.queryParamMap
    ])
      .pipe(
        switchMap( combined => {
            let id = combined[0].getAll('id')[0];
            console.log('id from URL: ' + id);
            this.playerService.setUrl('http://localhost:8080/players/' + id);
            return this.playerService.getAll();
        }),
        catchError( (error: Response) => {
          return throwError(new AppError(error));
        }
      )).subscribe( player => {
        this.player = player;
      });
  }
  public addRoundHeader() {

    var date = new Date(this.gamePlayedOn).getTime();
    //console.log(this.gamePlayedOn+' '+ (date*1));
    this.roundsService.add({
      'playedBy': { 'id': this.player.id},
      'golfCourse': {'id': this.player.memberOf[0].id},
      'gamePlayedOn': date,
      'tee': {'id': this.teeId}

    }).subscribe((response) => {
      console.log(response);
      this.roundHeaderAdded = true;
      this.roundHeaderFromServer =  response;
    }, error => {

      alert('An unexpected error occured.');
    });
  }
}
