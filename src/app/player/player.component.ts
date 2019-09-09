import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlayerService } from '../services/player.service';
import {  switchMap, catchError } from 'rxjs/operators';
import { combineLatest, throwError } from 'rxjs';
import { AppError } from '../common/apperror';
import { RoundsService } from '../services/rounds.service';
import { InterComponentService } from '../services/inter-component.service';

@Component({
  selector: 'player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  player: any;
  rounds: any[];
  constructor(
    private route: ActivatedRoute,
    private service: PlayerService,
    private roundService: RoundsService,
    private icService: InterComponentService) { }

  ngOnInit() {
    /*
    //the http call also works.
    //but I've commented it out because the data for the player would already have
    //been fetched on the playerlist component.

    */
      this.player = this.icService.getData();
      if (this.player != null ) {
        console.log(this.player);
        if (this.player != null) {
          this.rounds = this.player.rounds;
        }
      }
      else {
          this.loadPlayerFromServer();
      }
    }

    public loadPlayerFromServer(){
      combineLatest([
        this.route.paramMap,
        this.route.queryParamMap
      ])
        .pipe(
          switchMap( combined => {
              let id = combined[0].getAll('id')[0];
              console.log('id from URL: ' + id);
              this.service.setUrl('http://localhost:8080/players/' + id);
              return this.service.getAll();
          }),
          catchError( (error: Response) => {
            return throwError(new AppError(error));
          }
        )).subscribe( player => {
          this.player = player;
          this.rounds = player.rounds;
          this.roundService.setRounds(this.player.rounds);
        });
    }

}