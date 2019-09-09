import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, combineLatest, throwError, } from 'rxjs';
import { map, switchMap, catchError} from 'rxjs/operators';
import { AppError } from '../common/apperror';
import { PlayerslistService } from '../services/playerslist.service';
import { InterComponentService } from '../services/inter-component.service';

@Component({
  selector: 'app-playerlist',
  templateUrl: './playerlist.component.html',
  styleUrls: ['./playerlist.component.css']
})
export class PlayerlistComponent implements OnInit {
  players: any[];
  constructor(
    private route: ActivatedRoute,
    private service: PlayerslistService,
    private icService: InterComponentService
  ) { }

  ngOnInit() {
    combineLatest([
      this.route.paramMap,
      this.route.queryParamMap
    ]).pipe(
      switchMap( combined => {
          let id = combined[0].getAll('id')[0];
          console.log('id from URL: ' + id);
          this.service.setUrl('http://localhost:8080/golfCourses/' + id + '/players');
          return this.service.getAll();
      }),
      catchError( (error: Response) => {
        return throwError(new AppError(error));
      })
    ).subscribe( players => {
      this.players = players;
     } );
  }

  clickedPlayer(index: number) {
    console.log('player round clicked!!!'+index+ this.players[index]);
    this.icService.setData(this.players[index]);
  }

}
